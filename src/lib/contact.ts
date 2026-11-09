export const CONTACT = {
  phone: "+255750603945",
  phoneDisplay: "+255 750 603 945",
  email: "clintonmsety@gmail.com",
  pobox: "P.O. Box 73, Chunya, Mbeya, Tanzania",
  city: "Chunya, Mbeya, Tanzania",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${CONTACT.phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailLink = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT.email}${q ? `?${q}` : ""}`;
};

export const gmailLink = (subject: string, body: string) =>
  `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", to: CONTACT.email, su: subject, body })}`;
