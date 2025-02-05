// server/api/packages/index.get.ts
import { H3Error } from 'h3'
import Package from '~/server/models/Package'
import { safeDbOperation } from '~/server/utils/db-helper'
import type { Package as IPackage, PackageResponse } from '~/types/package'

export default defineEventHandler(async (event): Promise<PackageResponse> => {
  try {
    const packages = await safeDbOperation(
      () => Package.find({ isActive: true })
        .select('-__v')
        .sort('price')
        .lean<IPackage[]>()
        .exec(),
      'Failed to fetch packages'
    )

    if (!packages?.length) {
      return {
        success: false,
        data: [],
        message: 'No active packages found'
      }
    }

    return {
      success: true,
      data: packages
    }

  } catch (error) {
    console.error('Error in packages route:', error)
    
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    })
  }
})