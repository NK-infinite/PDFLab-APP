export type QRPayload = {
    value: string;
    size: number;
    color: string;
    bgColor: string;
};

export const generateQRData = (payload: QRPayload) => {
    if (!payload.value.trim()) {
        throw new Error('QR value is empty');
    }

    return {
        value: payload.value,
        size: payload.size || 200,
        color: payload.color || '#000000',
        bgColor: payload.bgColor || '#FFFFFF',
    };
};
