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
        formData.append('or', 'a3b5a43e-c5c3-48f0-b43a-e9adeb65a702');

        // User inputs
        formData.append('firstname', name);
        formData.append('email', email);

        // Sanitize phone number: remove all non-numeric characters
        const sanitizedPhone = phone.replace(/\D/g, '');
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
