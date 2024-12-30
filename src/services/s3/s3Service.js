import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from './s3Client';

const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;

export const s3Service = {
    async uploadImage(imageData, folder, fileName) {
        // Convert base64 to array buffer
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const key = `${folder}/${fileName}`;

        try {
            await s3Client.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
                Body: bytes.buffer,
                ContentType: 'image/png',
            }));

            return key;
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }
    },

    async getSignedUrl(key) {
        try {
            const command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
            });

            return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        } catch (error) {
            console.error('Error generating signed URL:', error);
            throw error;
        }
    },

    async uploadProfilePicture(userId, imageData) {
        return this.uploadImage(imageData, 'profile-pictures', `${userId}.png`);
    },

    async uploadDrawing(userId, word, imageData) {
        const timestamp = Date.now();
        return this.uploadImage(
            imageData,
            'drawings',
            `${userId}_${word}_${timestamp}.png`
        );
    },
};