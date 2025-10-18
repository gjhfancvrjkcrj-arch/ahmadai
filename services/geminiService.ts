import { GoogleGenAI, Modality } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
    if (!aiInstance) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("مفتاح الواجهة البرمجية (API Key) غير موجود. يرجى التأكد من إعداده في متغيرات البيئة.");
        }
        aiInstance = new GoogleGenAI({ apiKey });
    }
    return aiInstance;
}

export async function editImageWithPrompt(base64Image: string, mimeType: string, prompt: string): Promise<string> {
    try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            throw new Error("لم يتم العثور على بيانات الصورة في استجابة الواجهة البرمجية.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            // Re-throw the original error, which could be from getAiInstance or the API call itself
            throw error;
        }
        // Fallback for non-Error exceptions
        throw new Error("حدث خطأ غير متوقع أثناء الاتصال بنموذج الذكاء الاصطناعي.");
    }
}

export async function mergeImagesWithPrompt(
    base64Image1: string, mimeType1: string,
    base64Image2: string, mimeType2: string,
    prompt: string
): Promise<string> {
     try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image1,
                            mimeType: mimeType1,
                        },
                    },
                    {
                         inlineData: {
                            data: base64Image2,
                            mimeType: mimeType2,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            throw new Error("لم يتم العثور على بيانات الصورة في استجابة الواجهة البرمجية.");
        }

    } catch (error) {
        console.error("Error calling Gemini API for merging:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("حدث خطأ غير متوقع أثناء الاتصال بنموذج الذكاء الاصطناعي.");
    }
}