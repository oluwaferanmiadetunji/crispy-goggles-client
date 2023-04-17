const paginate = (schema: any) => {
  schema.statics.paginate = async function (filter: any, options: any) {
    let sort = ''
    if (options.sortBy) {
      const sortingCriteria: any[] = []
      options.sortBy.split(',').forEach((sortOption: any) => {
        const [key, order] = sortOption.split(':')
        sortingCriteria.push((order === 'desc' ? '-' : '') + key)
      })
      sort = sortingCriteria.join(' ')
    } else {
      sort = '-createdAt'
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1
    const skip = (page - 1) * limit

    const countPromise = this.countDocuments(filter).exec()
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit)

    if (options.populate) {
      options.populate.split(',').forEach((populateOption: any) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a: any, b: any) => ({ path: b, populate: a })),
        )
      })
    }

    docsPromise = docsPromise.exec()

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [total, data] = values
      const totalPages = Math.ceil(total / limit)
      const result = {
        data,
        page,
        limit,
        totalPages,
        total,
      }
      return Promise.resolve(result)
    })
  }
}

export default paginate
