export const parseBedrockResponse = (result) => {
    try {
        // console.log('Parsing Bedrock response:', result);

        if (!result?.body) {
            throw new Error('No response body from Bedrock');
        }

        const parsedBody = JSON.parse(new TextDecoder().decode(result.body));
        // console.log('Parsed body:', parsedBody);

        if (!parsedBody?.content?.[0]?.text) {
            throw new Error('Invalid response format from Bedrock');
        }

        const responseText = parsedBody.content[0].text.toLowerCase();
        // console.log('Response text:', responseText);

        return responseText.includes('true') || responseText.includes('yes');
    } catch (error) {
        // console.error('Error parsing Bedrock response:', error);
        throw new Error(`Failed to parse Bedrock response: ${error.message}`);
    }
};