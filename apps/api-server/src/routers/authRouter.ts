import express from "express"
import Session from "supertokens-node/recipe/session"

const router = express.Router()

router.get("/auth/session", async (req, res) => {
  try {
    const session = await Session.getSession(req, res, {
      sessionRequired: false,
    })
    if (session) {
      res.json({ isAuthenticated: true, userId: session.getUserId() })
    } else {
      res.status(401).json({ isAuthenticated: false })
    }
  } catch (err) {
    res.status(401).json({ isAuthenticated: false })
    console.error(err)
  }
})

export default router
