const ProductServices = require('../services/product.service')
const multer = require('multer')
const path = require('path')
const root = require('app-root-path')
const fs = require('fs')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, root + '/src/public/')
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
})

const imageFilter = function (req, file, cb) {
   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!'
      return cb(new Error('Only image files are allowed!'), false)
   }
   cb(null, true)
}

const ProductControllers = {
   createProduct: async (req, res) => {
      let upload = multer({ storage: storage, fileFilter: imageFilter }).single('image')
      upload(req, res, async (err) => {
         req.body.image = 'http://localhost:8000/' + req.file.filename
         console.log(req.file)
         const dataCreate = req.body
         const data = await ProductServices.createProduct(dataCreate)
         if (!data) {
            return res.json({ message: 'Not found any data' })
         }
         res.status(201).json({
            message: 'Created successfully',
            data: data
         })
      })
   },
   getProductById: async (req, res) => {
      try {
         const id = req.params.id
         const data = await ProductServices.getProductById(id)
         if (!data) {
            return res.status(404).json({ message: 'Not found any Id like this' })
         }
         res.status(200).json(data)
      } catch (error) {
         res.status(500).json({ error: error.message })
      }
   },
   updateProduct: async (req, res) => {
      let upload = multer({ storage: storage, fileFilter: imageFilter }).single('image')
      upload(req, res, async (err) => {
         if (err) {
            return res.status(400).json({ message: err.message })
         }

         try {
            const id = req.params.id
            const dataUpdate = req.body
            const existingProduct = await ProductServices.getProductById(id)

            if (!existingProduct) {
               return res.status(404).json({ message: 'Product not found' })
            }

            if (req.file) {
               if (existingProduct.image) {
                  const oldImagePath = path.join(root.toString(), 'src', 'public', path.basename(existingProduct.image))
                  fs.unlink(oldImagePath, (err) => {
                     if (err) {
                        console.error('Failed to delete old image:', err)
                     }
                  })
               }
               dataUpdate.image = 'http://localhost:8000/' + req.file.filename
            }

            const data = await ProductServices.updateProduct(id, dataUpdate)
            if (!data) {
               return res.status(404).json({ message: 'Not found' })
            }
            res.status(200).json({
               message: 'Updated successfully',
               data: data
            })
         } catch (error) {
            res.status(400).json({ error: error.message })
         }
      })
      // try {
      //    const id = req.params.id
      //    const dataUpdate = req.body
      //    const data = await ProductServices.updateProduct(id, dataUpdate)
      //    res.status(200).json({
      //       message: 'Updated successfully',
      //       data: data
      //    })
      // } catch (error) {
      //    res.status(400).json({ error: error.message })
      // }
   },
   deleteProduct: async (req, res) => {
      try {
         const id = req.params.id
         await ProductServices.deleteProduct(id)
         res.status(200).json({ message: 'Deleted successfully' })
      } catch (error) {
         res.status(400).json({ error: error.message })
      }
   },
   getProductList: async (req, res) => {
      try {
         const { page = 1, limit = 5, orderBy = 'id', sortBy = 'desc', search } = req.query

         const data = await ProductServices.getProductList({
            page: +page ? +page : 1,
            limit: +limit ? +limit : 10,
            orderBy,
            sortBy,
            search
         })
         res.status(200).json(data)
      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   },
   getProducByCategory: async (req, res) => {
      try {
         const id = req.params.id
         const data = await ProductServices.getProductByCategory(id)
         if (!data) {
            res.status(404).json({ message: 'Not found any product has same name like this' })
         }
         res.status(200).json(data)
      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}

module.exports = ProductControllers