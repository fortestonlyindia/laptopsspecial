import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const esc = (s: string) =>
    String(s).replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
    );

const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

export const POST: APIRoute = async ({ request }) => {
    try {
        const { name, email, subject, message, botcheck } = await request.json();

        if (botcheck) return json({ success: true });

        if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
            return json({ success: false, message: "Invalid input" }, 400);
        }

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

        if (error) return json({ success: false, message: error.message }, 500);
        return json({ success: true });
    } catch (e) {
        return json({ success: false, message: "Server error" }, 500);
    }
};