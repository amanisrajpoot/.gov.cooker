-- .gov.cooker Database Schema
-- PostgreSQL 16+ with row-level security

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users and Identity
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    handle VARCHAR(50) UNIQUE NOT NULL,
    pii_ref UUID, -- Reference to encrypted PII store
    kyc_status VARCHAR(20) DEFAULT 'unverified' CHECK (kyc_status IN ('unverified', 'pending', 'verified', 'rejected')),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'reporter', 'moderator', 'ngo_partner', 'journalist', 'lawyer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Separate PII store with envelope encryption
CREATE TABLE pii_store (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    email_enc TEXT, -- Encrypted email
    phone_enc TEXT, -- Encrypted phone
    country VARCHAR(2), -- ISO country code
    consent_flags JSONB DEFAULT '{}', -- Consent tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns and Petitions
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    targets JSONB, -- Array of target officials
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Petition signatures with Merkle tree support
CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id), -- NULL for anonymous signatures
    sig_type VARCHAR(20) NOT NULL CHECK (sig_type IN ('verified', 'anonymous')),
    geo_bucket VARCHAR(10), -- Approximate location (e.g., "IN-KA-BLR")
    proof_merkle_leaf TEXT, -- Merkle tree leaf hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, user_id) -- Prevent duplicate signatures
);

-- Issues and Project Monitoring
CREATE TABLE issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location JSONB, -- GeoJSON or structured location data
    department VARCHAR(100),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'resolved', 'closed')),
    sla_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Field reports with evidence
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES users(id), -- NULL for anonymous reports
    evidence_ref TEXT, -- Reference to encrypted evidence in object storage
    enc_meta JSONB, -- Encrypted metadata
    flags JSONB DEFAULT '[]', -- Moderation flags
    moderation_state VARCHAR(20) DEFAULT 'pending' CHECK (moderation_state IN ('pending', 'approved', 'rejected', 'flagged')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Whistleblower cases
CREATE TABLE whistle_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    recipient_group_id UUID, -- Reference to recipient group
    key_policy JSONB, -- Encryption key policy
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Whistleblower evidence with client-side encryption
CREATE TABLE whistle_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES whistle_cases(id) ON DELETE CASCADE,
    blob_ref TEXT NOT NULL, -- Reference to encrypted blob in object storage
    ciphertext_hash TEXT NOT NULL, -- Hash of encrypted content
    recipient_keys JSONB, -- Array of recipient public keys
    consent_log JSONB DEFAULT '[]', -- Consent tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RTI/FOI cases
CREATE TABLE rti_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department VARCHAR(100) NOT NULL,
    requester_id UUID REFERENCES users(id),
    draft_text TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'acknowledged', 'replied', 'rejected', 'appealed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RTI replies with OCR
CREATE TABLE rti_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES rti_cases(id) ON DELETE CASCADE,
    blob_ref TEXT NOT NULL, -- Reference to PDF in object storage
    text_ocr TEXT, -- Extracted text via OCR
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Open datasets
CREATE TABLE datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'budget', 'tender', 'contract', etc.
    schema_ver VARCHAR(10) DEFAULT '1.0',
    refresh_cron VARCHAR(50), -- Cron expression for refresh
    public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenders with anomaly detection
CREATE TABLE tenders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer VARCHAR(200),
    vendor VARCHAR(200),
    amount DECIMAL(15,2),
    date DATE,
    features_json JSONB, -- Structured tender features
    anomaly_score DECIMAL(5,4), -- 0.0000 to 1.0000
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal cases and crowdfunding
CREATE TABLE legal_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID REFERENCES users(id),
    target VARCHAR(200) NOT NULL,
    funds_collected DECIMAL(15,2) DEFAULT 0,
    funds_target DECIMAL(15,2),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'funded', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Moderation queue
CREATE TABLE moderation_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_ref TEXT NOT NULL, -- Reference to moderated item
    item_type VARCHAR(50) NOT NULL, -- 'report', 'signature', 'comment', etc.
    reason TEXT,
    assigned_to UUID REFERENCES users(id),
    state VARCHAR(20) DEFAULT 'pending' CHECK (state IN ('pending', 'in_review', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log for transparency
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    target VARCHAR(100), -- Target resource identifier
    target_type VARCHAR(50), -- Type of target resource
    hash TEXT, -- Hash of the action for integrity
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Merkle tree roots for transparency
CREATE TABLE sig_merkle_roots (
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    root_hash TEXT NOT NULL,
    period TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (campaign_id, period)
);

-- Append-only transparency log
CREATE TABLE append_log (
    seq BIGSERIAL PRIMARY KEY,
    prev_hash TEXT,
    entry_hash TEXT NOT NULL,
    entry_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_handle ON users(handle);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_created ON campaigns(created_at);
CREATE INDEX idx_signatures_campaign ON signatures(campaign_id);
CREATE INDEX idx_signatures_created ON signatures(created_at);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_department ON issues(department);
CREATE INDEX idx_reports_issue ON reports(issue_id);
CREATE INDEX idx_reports_moderation ON reports(moderation_state);
CREATE INDEX idx_rti_cases_status ON rti_cases(status);
CREATE INDEX idx_rti_cases_department ON rti_cases(department);
CREATE INDEX idx_tenders_anomaly ON tenders(anomaly_score);
CREATE INDEX idx_tenders_date ON tenders(date);
CREATE INDEX idx_moderation_queue_state ON moderation_queue(state);
CREATE INDEX idx_audit_log_actor ON audit_log(actor);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pii_store ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE whistle_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE whistle_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE rti_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_queue ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (to be expanded based on requirements)
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Functions for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (actor, action, target, target_type, hash, metadata)
    VALUES (
        COALESCE(NEW.updated_by, 'system'::UUID),
        TG_OP,
        COALESCE(NEW.id::TEXT, OLD.id::TEXT),
        TG_TABLE_NAME,
        encode(digest(COALESCE(NEW::TEXT, OLD::TEXT), 'sha256'), 'hex'),
        jsonb_build_object(
            'old', CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
            'new', CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END
        )
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Audit triggers for sensitive tables
CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER campaigns_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER signatures_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON signatures
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
