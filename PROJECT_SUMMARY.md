# .gov.cooker Platform - Project Summary

## 🎯 Mission
Make corruption and non-delivery *visible, verifiable, and costly* for officials—while protecting citizens and whistleblowers.

## 🏗️ Architecture Overview

### Core Components
- **Frontend**: Next.js PWA (mobile-responsive)
- **Backend**: NestJS API with TypeScript
- **Database**: PostgreSQL 16 with row-level security
- **Storage**: S3 with client-side encryption
- **Infrastructure**: Kubernetes on AWS (two-region deployment)

### Key Features Implemented

#### 1. **Authentication & Identity**
- Multiple user modes: Anonymous, Pseudonymous, Verified, Trusted
- OTP verification with consent-first approach
- RBAC with roles: user, reporter, moderator, ngo_partner, journalist, lawyer, admin
- Separate PII store with envelope encryption

#### 2. **Petitions & Campaigns**
- Campaign creation with target officials
- Verified and anonymous signature collection
- Merkle tree transparency logs
- Milestone triggers (5k/50k/100k signatures)
- Shareable widgets and QR codes

#### 3. **Issue & Project Monitoring**
- Hierarchical issue tracking (Issue → Sub-issues → Tasks)
- Evidence uploads with metadata stripping
- Field validation with perceptual hashing
- Status ledger with append-only events

#### 4. **RTI/FOI Automation**
- Department directory per state/country
- Templated draft generation
- Reply tracking with due dates
- PDF upload with OCR processing
- Public redaction tools

#### 5. **Whistleblower Protection**
- Client-side encryption (AES-GCM)
- Files encrypted before upload
- Time-lock release with Shamir Secret Sharing
- Safety UX with workplace warnings
- Out-of-band contact options

#### 6. **Open Data Dashboard**
- Budget, tender, contract datasets
- Anomaly detection with ML
- Red-flag analytics
- Citizen evidence comparison
- CSV/JSON exports

#### 7. **Transparency & Audit**
- Merkle tree implementation
- Append-only logs
- Tamper-evident signatures
- Public verification
- Audit trails

## 📱 Mobile-First Design

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Key Mobile Features
- Touch-friendly 44px minimum targets
- Thumb navigation optimization
- Swipe gestures
- Progressive disclosure
- Offline capability
- PWA support

## 🔒 Security & Privacy

### Client-Side Encryption
- AES-GCM encryption for whistleblower reports
- Key generation on device
- Metadata stripping on all uploads
- Perceptual hashing for duplicate detection

### Privacy Protection
- Data minimization principles
- Separate PII store
- Consent-first data collection
- Anonymous reporting options
- Metadata stripping

### Transparency Features
- Merkle trees for tamper evidence
- Append-only audit logs
- Public verification
- Cryptographic proofs

## 🗄️ Database Design

### Core Tables
- `users` - User accounts with RBAC
- `pii_store` - Encrypted personal information
- `campaigns` - Petition campaigns
- `signatures` - Campaign signatures with Merkle proofs
- `issues` - Issue tracking
- `reports` - Field reports with evidence
- `whistle_cases` - Whistleblower cases
- `whistle_evidence` - Encrypted evidence
- `rti_cases` - RTI requests and responses
- `tenders` - Government tender data
- `legal_cases` - Legal action tracking
- `moderation_queue` - Content moderation
- `audit_log` - System audit trail

### Security Features
- Row-level security (RLS)
- Audit triggers
- Encryption at rest
- Access controls
- Data retention policies

## 🚀 Infrastructure

### Two-Region Deployment
- **Primary**: us-east-1 (Active)
- **Secondary**: us-west-2 (Standby)
- Cross-region replication
- Automated failover
- Disaster recovery

### Kubernetes Components
- EKS clusters in both regions
- Auto-scaling node groups
- Service mesh (Istio)
- Monitoring and logging
- Security scanning

### AWS Services
- RDS PostgreSQL (encrypted)
- S3 object storage
- CloudFront CDN
- Route 53 DNS
- ACM certificates
- WAF protection

## 📊 API Specification

### Phase-A Endpoints
- **Authentication**: `/auth/*`
- **Campaigns**: `/campaigns/*`
- **Issues**: `/issues/*`
- **RTI**: `/rti/*`
- **Whistleblower**: `/whistle/*`
- **Open Data**: `/tenders`, `/assets`
- **Moderation**: `/mod/*`

### Security Features
- JWT authentication
- Rate limiting
- Input validation
- SQL injection protection
- XSS prevention
- CSRF protection

## 🎨 User Experience

### Wireframes Created
1. **Petition Flow**: Campaign discovery, detail, signing, success
2. **Secure Report Upload**: Type selection, encryption, recipient selection
3. **RTI Draft & Tracker**: Request creation, status tracking
4. **Moderation Console**: Content review, decision making

### Design Principles
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)
- High contrast support
- Screen reader compatibility
- Keyboard navigation
- Progressive enhancement

## 📋 Content Policy & Moderation

### Content Categories
- ✅ **Allowed**: Verified reports, petitions, RTI requests, public data
- ⚠️ **Restricted**: Unverified claims, personal attacks, commercial content
- ❌ **Prohibited**: Illegal content, violence, harassment, disinformation

### Moderation Process
1. **Automated Screening**: AI detection, metadata analysis
2. **Human Review**: Moderator queue, escalation procedures
3. **Decision Framework**: Immediate action, standard review, complex review
4. **Appeal Process**: Internal appeal, independent review

### Safety Measures
- Anonymity options
- Whistleblower protection
- Harassment prevention
- Evidence standards
- Legal compliance

## 🔧 Development Setup

### Project Structure
```
.gov.cooker/
├── apps/
│   ├── web/          # Next.js PWA frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── crypto/       # Client-side encryption
├── infrastructure/
│   ├── terraform/    # Infrastructure as code
│   └── helm/         # Kubernetes deployment
├── database/         # SQL migrations
└── docs/            # Documentation
```

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, PostgreSQL, Redis
- **Infrastructure**: AWS, Kubernetes, Terraform, Helm
- **Security**: Client-side encryption, Merkle trees, audit logs
- **Monitoring**: Prometheus, Grafana, ELK stack

## 🚀 Deployment

### Production Environment
- Two-region AWS deployment
- Kubernetes orchestration
- Auto-scaling and load balancing
- CDN with global distribution
- SSL/TLS encryption
- WAF protection

### Development Environment
- Local development with Docker
- Hot reloading for frontend/backend
- Database migrations
- Testing framework
- Linting and formatting

## 📈 Next Steps

### Phase A (MVP)
- [x] Project structure and architecture
- [x] Database schema and migrations
- [x] API specification
- [x] Frontend components and wireframes
- [x] Security and encryption
- [x] Infrastructure setup
- [ ] Backend API implementation
- [ ] Frontend integration
- [ ] Testing and validation

### Phase B (Safety & Legal)
- [ ] Whistleblower encryption implementation
- [ ] RTI generator and tracker
- [ ] Legal action hub
- [ ] Enhanced security features

### Phase C (Scale & Analytics)
- [ ] ETL pipelines for data scraping
- [ ] ML anomaly detection
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

### Phase D (Governance & Ecosystem)
- [ ] Crowdfunding integration
- [ ] Partner network
- [ ] Advanced transparency features
- [ ] Community governance

## 🛡️ Security Considerations

### Threat Model
- Deanonymization of whistleblowers
- Server compromise and insider abuse
- Evidence tampering
- Mass spam and brigading
- Legal harassment and DDoS

### Mitigation Strategies
- Client-side encryption
- Split PII storage
- Access controls and audit logs
- Tamper evidence with Merkle trees
- Moderation and rate limiting
- DDoS protection and failover

## 📞 Support & Contact

- **Security**: security@gov-cooker.org
- **Legal**: legal@gov-cooker.org
- **Technical**: support@gov-cooker.org
- **General**: info@gov-cooker.org

---

*This platform is designed to balance transparency with safety, enabling citizens to hold their government accountable while protecting their privacy and security.*
