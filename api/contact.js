import { Resend } from "resend";

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { name, email, subject, message, botcheck } = req.body || {};

        if (botcheck) return res.status(200).json({ success: true });

        if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid input" });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "Laptops Special <noreply@laptopsspecial.com>",
            to: ["reallaptopsspecial@gmail.com"],
            replyTo: email,
            subject: `[Contact] ${subject || "New message"} - ${name}`.slice(0, 150),
            html: `
                <p><b>Name:</b> ${esc(name)}</p>
                <p><b>Email:</b> ${esc(email)}</p>
                <p><b>Topic:</b> ${esc(subject || "-")}</p>
                <p><b>Message:</b></p>
                <p>${esc(message).replace(/\n/g, "<br>")}</p>
            `,
        });

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}