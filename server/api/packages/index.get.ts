import Package from '~/server/models/Package'

export default defineEventHandler(async (event) => {
    try {
        const packages = await Package.find({ isActive: true })
        return packages
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch packages'
        })
    }
})
