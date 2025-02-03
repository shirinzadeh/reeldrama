import Package from '~/server/models/Package'

export default defineEventHandler(async (event) => {
    try {
        const packages = await Package.find({ isActive: true })
        return { success: true, data: packages };
    } catch (error) {
        console.error('Error fetching packages:', error);

        setResponseStatus(event, 500); // ✅ Ensure proper HTTP status
        return { success: false, message: 'Failed to fetch packages' };

    }
})
