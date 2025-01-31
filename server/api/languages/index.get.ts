import Language  from '../../models/language';

export default defineEventHandler(async event => {
    try {
        const languages = await Language.find({ isActive: true });
        return languages;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Error fetching languages',
        })
    }
})