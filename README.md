# Regents Care - Appointment Booking MVP

A streamlined appointment booking system that transforms clicks from Google, Maps, or social media into booking-ready emails with PDF attachments.

## Features

- **Dynamic Booking Forms** (`/c/[seat_id]`) - Custom booking forms for each healthcare provider
- **Email Integration** - Automatic email sending with PDF attachments via Resend
- **PDF Generation** - Professional PDF documents with patient information and Regents Care branding
- **Seat Management** (`/seats`) - Admin interface to manage healthcare provider seats
- **Database Integration** - Supabase for secure data storage and referral logging
- **Professional Pages** - Privacy Policy and Terms of Service pages
- **Modern UI** - Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `database-setup.sql` in your Supabase SQL editor
3. Copy your Supabase URL and anon key to `.env.local`

### 4. Email Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key and add it to `.env.local`
3. Configure your domain for sending emails (recommended: `referrals@regentscare.com`)

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── c/[seat_id]/          # Dynamic booking forms
│   ├── seats/                # Seat management
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── api/
│   │   ├── book-appointment/ # Booking API
│   │   └── seats/           # Seat management API
│   └── layout.js            # Root layout
├── components/
│   └── BookingForm.js       # Main booking form component
└── lib/
    ├── supabase.js          # Database client
    └── pdf-generator.js     # PDF generation utility
```

## Usage

### For Healthcare Providers

1. **Add Your Practice**: Go to `/seats` and add your practice with a unique seat ID
2. **Get Your Link**: Your booking link will be `/c/[your-seat-id]`
3. **Share Your Link**: Use this link in Google Business, Maps, social media, or your website
4. **Receive Bookings**: Patients fill the form and you receive booking-ready emails with PDFs

### For Patients

1. **Click Booking Link**: Click the provider's unique booking link
2. **Fill Form**: Complete the appointment request form
3. **Submit**: Form is sent to the practice with patient CC'd
4. **Confirmation**: Patient receives email confirmation

## API Endpoints

### POST `/api/book-appointment`
Handles appointment form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "dob": "1990-01-01",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "insurer": "Blue Cross",
  "policy": "123456789",
  "urgency": "routine",
  "summary": "Annual checkup",
  "consent": true,
  "seat_id": "demo-doctor"
}
```

### GET `/api/seats`
Returns all seats.

### POST `/api/seats`
Creates a new seat.

### PUT `/api/seats`
Updates an existing seat.

### DELETE `/api/seats?id=[id]`
Deletes a seat.

## Database Schema

### Seats Table
```sql
CREATE TABLE seats (
    id UUID PRIMARY KEY,
    seat_id VARCHAR(255) UNIQUE NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    practice_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Referrals Table
```sql
CREATE TABLE referrals (
    id UUID PRIMARY KEY,
    seat_id VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    insurer VARCHAR(255),
    policy VARCHAR(255),
    urgency VARCHAR(50) DEFAULT 'routine',
    summary TEXT NOT NULL,
    consent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
);
```

## Email Configuration

### SPF/DKIM/DMARC Setup

For optimal email deliverability, configure these DNS records:

**SPF Record:**
```
v=spf1 include:_spf.resend.com ~all
```

**DKIM Record:**
```
[Your domain's DKIM key from Resend]
```

**DMARC Record:**
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@regentscare.com
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Testing

### Demo Booking
Visit `/c/demo-doctor` to test the booking form with the demo seat.

### Email Testing
Use Resend's test mode for development. Switch to production mode for live emails.

## Security Considerations

- All form data is validated server-side
- Database uses Row Level Security (RLS)
- Email addresses are validated
- PDF generation is server-side only
- HTTPS required for production

## Support

For support or questions:
- Email: support@regentscare.com
- Documentation: [Add your docs URL]

## License

[Add your license information]

---

Built with ❤️ for healthcare providers who value simplicity and efficiency.
