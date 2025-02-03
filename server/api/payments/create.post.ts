import Package from '~/server/models/Package'
import Payment from '~/server/models/Payment'

export default defineEventHandler(async (event) => {
    // Temporarily disable auth check for development
    // const session = await getServerSession(event)
    // if (!session) {
    //     throw createError({
    //         statusCode: 401,
    //         message: 'Unauthorized'
    //     })
    // }

    const body = await readBody(event)
    const { packageId, paymentMethod } = body

    try {
        // Renamed 'package' to 'packageData' to avoid reserved word
        const packageData = await Package.findById(packageId)
        if (!packageData) {
            setResponseStatus(event, 404); // ✅ Proper HTTP status for not found
            return { success: false, message: 'Package not found' };
        }

        // Create payment record
        const payment = await Payment.create({
            userId: 'temp-user-id', // Temporary until auth is implemented
            packageId,
            amount: packageData.price,
            method: paymentMethod,
            status: 'pending'
        })

        return {
            success: true,
            paymentId: payment._id,
        }
    } catch (error) {
        setResponseStatus(event, 500); // ✅ Ensure proper HTTP status
        return { success: false, message: 'Payment initialization failed' };
    }
})
