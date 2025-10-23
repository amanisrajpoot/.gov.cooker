# .gov.cooker Platform

> **Making corruption and non-delivery visible, verifiable, and costly for officials—while protecting citizens and whistleblowers.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/gov-cooker/platform)
[![Security Score](https://img.shields.io/badge/security-A%2B-brightgreen)](https://github.com/gov-cooker/platform)
[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](https://github.com/gov-cooker/platform/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile-lightblue)](https://github.com/gov-cooker/platform)

## 🎯 Mission

The .gov.cooker platform is a comprehensive transparency and accountability system that:

- **Makes corruption visible** through public campaigns and evidence-based reporting
- **Makes corruption verifiable** through cryptographic transparency logs and audit trails
- **Makes corruption costly** through public pressure and legal accountability
- **Protects citizens and whistleblowers** through encryption and anonymity

## ✨ Features

### 🏛️ **Campaigns & Petitions**
- Create and sign campaigns targeting specific officials
- Merkle tree transparency logging for tamper-evident signatures
- Milestone tracking and public pressure mechanisms
- Anonymous and verified signature options

### 📋 **Issue Reporting**
- GPS-enabled issue reporting with evidence upload
- Department assignment and tracking
- Status updates and resolution monitoring
- File upload with metadata stripping for privacy

### 📄 **RTI Automation**
- Automated Right to Information request creation
- Department-specific question templates
- Request tracking and response management
- Legal compliance and deadline monitoring

### 🔒 **Whistleblower Protection**
- Client-side encryption for sensitive reports
- Recipient selection (NGOs, journalists, lawyers)
- Time-lock release mechanisms
- Anonymous reporting with safety guidelines

### 📊 **Open Data & Analytics**
- Government spending data analysis
- ML-powered anomaly detection
- Red-flag analytics and reporting
- Spending pattern analysis and vendor mapping

### 🛡️ **Content Moderation**
- Automated content analysis and toxicity detection
- Human review queue with appeal process
- Duplicate content detection
- Community guidelines and enforcement

### 👥 **Admin Dashboard**
- User management and analytics
- Content moderation queue
- System monitoring and health checks
- Performance metrics and reporting

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/gov-cooker/platform.git
cd platform

# Run the setup script
# On Windows:
scripts/setup-local.bat

# On Linux/Mac:
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh

# Access the applications
# Frontend: http://localhost:3000
# API: http://localhost:3001
# API Docs: http://localhost:3001/api/docs
```

### Manual Setup

```bash
# Install dependencies
npm install

# Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start services
docker-compose up -d

# Run database migrations
docker-compose exec api npm run migration:run

# Seed initial data
docker-compose exec api npm run seed:run
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:cov
```

### Test Scripts

```bash
# Comprehensive local testing
# On Windows:
scripts/test-local.bat

# On Linux/Mac:
./scripts/test-local.sh
```

## 🚀 Deployment

### Production Deployment

```bash
# Deploy to production
./scripts/deploy-production.sh

# Or follow the detailed guide
# See PRODUCTION_DEPLOYMENT_GUIDE.md
```

### Infrastructure

The platform is designed for high availability with:

- **Two-region AWS deployment** (us-east-1 + us-west-2)
- **Kubernetes orchestration** with auto-scaling
- **PostgreSQL database** with encryption and backups
- **Redis caching** for performance
- **CloudFront CDN** for global distribution
- **SSL/TLS encryption** for security

## 🏗️ Architecture

### Backend (NestJS)
- **Authentication**: JWT with role-based access control
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis for session and data caching
- **File Processing**: Multer + Sharp for image optimization
- **Encryption**: AES-GCM for sensitive data
- **Transparency**: Merkle trees for tamper evidence

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API
- **PWA Support**: Offline capability and mobile optimization
- **Accessibility**: WCAG 2.1 AA compliant

### Security
- **Client-side encryption** for sensitive data
- **Metadata stripping** on all uploads
- **Audit trails** for all actions
- **Rate limiting** and abuse protection
- **Input validation** and sanitization

## 📱 Mobile Support

The platform is fully responsive and mobile-optimized:

- **Progressive Web App (PWA)** with offline support
- **Touch-friendly interface** with 44px minimum targets
- **Camera integration** for evidence upload
- **GPS location services** for automatic location detection
- **Mobile-first design** with responsive breakpoints

## 🔒 Security & Privacy

### Data Protection
- **Encryption at rest** and in transit
- **Client-side encryption** for sensitive data
- **Metadata stripping** on all uploads
- **Consent-first** data collection
- **Anonymous reporting** options

### Transparency
- **Merkle trees** for tamper-evident logging
- **Public verification** capabilities
- **Audit trails** for all actions
- **Open source** codebase
- **Regular security audits**

## 📚 Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete API reference
- **[User Guide](docs/USER_GUIDE.md)** - User manual and tutorials
- **[Local Testing Guide](LOCAL_TESTING_GUIDE.md)** - Local development setup
- **[Production Deployment Guide](PRODUCTION_DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute

## 🛠️ Development

### Project Structure

```
├── apps/
│   ├── api/                 # NestJS backend API
│   └── web/                 # Next.js frontend
├── packages/
│   ├── shared/             # Shared utilities
│   └── crypto/              # Encryption utilities
├── infrastructure/          # Terraform and Helm configs
├── database/               # SQL migrations and seeds
├── docs/                   # Documentation
└── scripts/                # Deployment and setup scripts
```

### Tech Stack

- **Backend**: NestJS, TypeORM, PostgreSQL, Redis
- **Frontend**: Next.js, React, Tailwind CSS
- **Infrastructure**: Docker, Kubernetes, Terraform, Helm
- **Security**: JWT, AES-GCM, Merkle trees
- **Monitoring**: Prometheus, Grafana, ELK stack

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.gov-cooker.org](https://docs.gov-cooker.org)
- **Issues**: [GitHub Issues](https://github.com/gov-cooker/platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gov-cooker/platform/discussions)
- **Email**: support@gov-cooker.org

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Core platform functionality
- [x] User authentication and management
- [x] Campaign and petition system
- [x] Issue reporting and tracking
- [x] RTI automation
- [x] Whistleblower protection
- [x] Open data and analytics
- [x] Content moderation
- [x] Admin dashboard

### Phase 2: Enhancement 🚧
- [ ] Advanced ML features
- [ ] Mobile app development
- [ ] International localization
- [ ] Advanced analytics
- [ ] Integration with government systems

### Phase 3: Scale 🌍
- [ ] Multi-country deployment
- [ ] Advanced security features
- [ ] Enterprise features
- [ ] API marketplace
- [ ] Community features

## 🙏 Acknowledgments

- **Open Source Community** for the amazing tools and libraries
- **Contributors** who help make this platform better
- **Users** who provide feedback and suggestions
- **Government Transparency Advocates** for inspiration and guidance

---

**Together, we can make corruption visible, verifiable, and costly for officials while protecting citizens and whistleblowers.**

[![GitHub stars](https://img.shields.io/github/stars/gov-cooker/platform?style=social)](https://github.com/gov-cooker/platform)
[![Twitter Follow](https://img.shields.io/twitter/follow/govcooker?style=social)](https://twitter.com/govcooker)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow-blue?style=social&logo=linkedin)](https://linkedin.com/company/gov-cooker)