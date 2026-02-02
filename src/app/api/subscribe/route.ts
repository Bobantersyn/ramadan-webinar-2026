import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Name, email and phone are required' },
                { status: 400 }
            );
        }

        // ActiveCampaign / MailBlue form data
        const formData = new URLSearchParams();
        formData.append('u', '6');
        formData.append('f', '6');
        formData.append('s', '');
        formData.append('c', '0');
        formData.append('m', '0');
        formData.append('act', 'sub');
        formData.append('v', '2');
        formData.append('or', '142f678a-363b-4079-9719-9aecb09899ff');

        // User inputs
        formData.append('firstname', name);
        formData.append('email', email);

        // Sanitize phone number: remove all non-numeric characters
        let sanitizedPhone = phone.replace(/\D/g, '');

        // Format to valid E.164 for Netherlands if possible
        if (sanitizedPhone.startsWith('06') && sanitizedPhone.length === 10) {
            sanitizedPhone = '+31' + sanitizedPhone.substring(1);
        } else if (sanitizedPhone.startsWith('6') && sanitizedPhone.length === 9) {
            sanitizedPhone = '+31' + sanitizedPhone;
        } else if (!sanitizedPhone.startsWith('+')) {
            // Ensure strict plus prefix if not present (AC often prefers this)
            sanitizedPhone = '+' + sanitizedPhone;
        }

        formData.append('phone', sanitizedPhone);

        // Send to ActiveCampaign
        const response = await fetch('https://defitnesscoach.activehosted.com/proc.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // ActiveCampaign returns a redirect or HTML, but we just want to know if it accepted the request.
        // If the network request didn't fail, we assume success for this type of old-school form POST.
        if (response.ok || response.status === 302 || response.status === 200) {
            return NextResponse.json({ success: true });
        } else {
            console.error('ActiveCampaign error:', response.status, response.statusText);
            return NextResponse.json(
                { error: 'Failed to submit to external provider' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
