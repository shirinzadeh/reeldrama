import Language  from '../../models/language';

export default defineEventHandler(async event => {
    try {
        const languages = await Language.find({ isActive: true });
        return { success: true, data: languages }; // ✅ Ensure proper response format
    } catch (error) {
        console.error('Error fetching languages:', error);
        setResponseStatus(event, 500); // ✅ Ensure proper HTTP status
        return { success: false, message: 'Error fetching languages' };
    }
})