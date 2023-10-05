import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec()

    res.json(posts)
  } catch (error) {
    res.status(500).json({
      message: "Cant get posts"
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        $inc: {
          viewsCount: 1
        }
      },
      {
        returnDocument: "after"
      }
    )

    if (!doc) {
      return res.status(404).json({
        message: "Can't fin post"
      })
    }

    res.json(doc)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Cant get posts"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = await PostModel.updateOne(
      {
        _id: postId
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId
      }
    )

    if (!doc) {
      return res.status(404).json({
        message: "Can't fin post"
      })
    }

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Cant update post"
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = await PostModel.findOneAndDelete({
      _id: postId
    })

    if (!doc) {
      return res.status(404).json({
        message: "Can't find post"
      })
    }

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Cant update post"
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    })
    const post = await doc.save()
    res.json(post)
  } catch (error) {
    res.status(500).json({
      message: "Can't create post"
    })
  }
}
