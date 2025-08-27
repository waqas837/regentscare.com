# Regents Care - Appointment Booking System

A Next.js application that converts appointment clicks into booking-ready emails with PDF attachments for healthcare providers.

## Features

- **Dynamic Booking Forms**: `/c/[seat_id]` - Custom booking forms for each healthcare provider
- **Email Integration**: Sends booking-ready emails with PDF attachments via Postmark
- **Database Management**: Supabase for seat registry and referral logging
- **Modern UI**: Clean, responsive design with toast notifications
- **Security**: Server-side keys only, no client-side exposure

## Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Postmark account
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd regentscare.com
   npm install
   ```

2. **Environment Variables:**
   Create `.env.local` with:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Postmark Email
   EMAIL_PROVIDER=postmark
   POSTMARK_TOKEN=your_postmark_token
   FROM_EMAIL=referrals@regentscare.com
   AUDIT_BCC=info@regentscare.com
   MESSAGE_STREAM=outbound
   ```

3. **Database Setup:**
   - Run the SQL script in `database-setup.sql` in your Supabase SQL editor
   - This creates the `seats` and `referrals` tables with proper schema

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## Adding New Seats (Healthcare Providers)

### Method 1: Via Web Interface

1. Navigate to `/seats` page
2. Fill in the form:
   - **Seat ID**: Unique identifier (e.g., `dr-smith-cardiology`)
   - **Consultant Name**: Full name of the healthcare provider
   - **Booking Email**: Practice's booking inbox email
   - **Specialty**: Medical specialty (e.g., Cardiology, Orthopedics)
   - **Hospitals**: List of hospitals/practices
   - **Logo URL**: (Optional) Provider's logo URL
3. Click "Add Seat"

### Method 2: Direct Database Insert

```sql
INSERT INTO seats (seat_id, consultant_name, booking_email, specialty, hospitals, logo_url)
VALUES (
    'dr-smith-cardiology',
    'Dr. John Smith',
    'bookings@cardiologyclinic.com',
    'Cardiology',
    'London Heart Hospital, St. Mary\'s Medical Center',
    'https://example.com/logo.png'
);
```

### Method 3: API Call

```javascript
const response = await fetch('/api/seats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    seat_id: 'dr-smith-cardiology',
    consultant_name: 'Dr. John Smith',
    booking_email: 'bookings@cardiologyclinic.com',
    specialty: 'Cardiology',
    hospitals: 'London Heart Hospital, St. Mary\'s Medical Center',
    logo_url: 'https://example.com/logo.png'
  })
});
```

## Booking Flow

1. **Patient visits**: `/c/[seat_id]` (e.g., `/c/dr-smith-cardiology`)
2. **Fills form**: Name, DOB, Email, Phone, Insurance, Urgency, Summary
3. **System processes**:
   - Saves referral to database
   - Generates PDF with patient details
   - Sends email to practice inbox
   - CCs patient email
   - Attaches PDF
4. **Practice receives**: Booking-ready email with all patient information

## API Endpoints

### `/api/book-appointment`
- **Method**: POST
- **Purpose**: Process booking form submission
- **Response**: Success/error message with Postmark Message ID

### `/api/seats`
- **Method**: GET, POST, PUT, DELETE
- **Purpose**: CRUD operations for healthcare provider seats
- **Authentication**: Server-side only

## Database Schema

### Seats Table
```sql
CREATE TABLE seats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat_id VARCHAR(255) UNIQUE NOT NULL,
    consultant_name VARCHAR(255) NOT NULL,
    booking_email VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    hospitals TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Referrals Table
```sql
CREATE TABLE referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seat_id VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(50),
    patient_dob VARCHAR(50),
    insurer VARCHAR(255),
    policy VARCHAR(255),
    urgency VARCHAR(50) DEFAULT 'routine',
    summary TEXT,
    consultant_name VARCHAR(255),
    booking_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id) ON DELETE CASCADE
);
```

## Email Configuration

### Postmark Setup
1. Create Postmark account
2. Add domain `regentscare.com`
3. Configure SPF/DKIM/DMARC records
4. Get API token from dashboard
5. Set environment variables

### Email Format
- **To**: Practice booking inbox
- **CC**: Patient email
- **From**: referrals@regentscare.com
- **Subject**: "New referral — {condition} — {Urgent|Soon}"
- **Attachment**: 1-page PDF with patient details

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EMAIL_PROVIDER=postmark
POSTMARK_TOKEN=your_postmark_token
FROM_EMAIL=referrals@regentscare.com
AUDIT_BCC=info@regentscare.com
MESSAGE_STREAM=outbound
```

## Testing

### Test Booking Flow
1. Visit `/c/demo-doctor`
2. Fill form with test data
3. Submit and check:
   - Email received at practice inbox
   - Patient CC'd
   - PDF attached with correct logo
   - Referral logged in database

### Test Seats Management
1. Visit `/seats`
2. Add new seat
3. Update existing seat
4. Delete seat
5. Verify all operations work with loading states

## Troubleshooting

### Common Issues

1. **Supabase Connection Failed**
   - Check environment variables
   - Verify service role key
   - Ensure project is active

2. **Email Not Sending**
   - Verify Postmark token
   - Check domain authentication
   - Review Postmark Activity logs

3. **PDF Generation Issues**
   - Check logo URL accessibility
   - Verify @react-pdf/renderer installation
   - Review server logs

4. **404 on Booking Pages**
   - Verify seat exists in database
   - Check seat_id format
   - Review dynamic route configuration

## Security

- **Server-side keys only**: No client-side database access
- **Row Level Security**: Enabled on all tables
- **Environment variables**: All sensitive data in .env
- **HTTPS only**: Production deployment

## Support

For technical support or questions:
- Check Postmark Activity for email delivery status
- Review Supabase logs for database issues
- Monitor Vercel function logs for API errors

---

**Regents Care** - Converting clicks into bookings since 2024
