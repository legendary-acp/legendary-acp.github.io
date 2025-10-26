export const extractFirstImage = (htmlContent: string): string | null => {
    if (!htmlContent) return null;
    const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
};

export const getExcerpt = (htmlContent: string, wordLimit = 20): string => {
    const plain = stripHtml(htmlContent);
    if (!plain) return "";
    const words = plain.split(/\s+/).filter(Boolean);
    if (words.length <= wordLimit) return plain;
    return words.slice(0, wordLimit).join(" ") + "…";
};

export const calculateReadTime = (htmlContent: string, wpm = 200): string => {
    const words = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / Math.max(1, wpm)));
    return `${minutes} min read`;
};

export const formatDate = (
    dateInput: string | Date,
    locale: string = "en-US",
    options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
): string => {
    try {
        const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
        if (Number.isNaN(d.getTime())) return String(dateInput);
        return d.toLocaleDateString(locale, options);
    } catch {
        return String(dateInput);
    }
};

const stripHtml = (html: string): string =>
    (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
