import { Router } from 'express'
import * as taskCtrl from "../controllers/tasks.controllers.js"

const router = Router()

router.get('/', taskCtrl.findAllTasks )

router.post('/', taskCtrl.createTask)

router.get('/done', taskCtrl.findAllDoneTask)

router.get('/undone', taskCtrl.findAllUndoneTask)

router.get('/:id', taskCtrl.findOneTask)

router.delete('/:id', taskCtrl.deleteTask)

router.put('/:id', taskCtrl.updateTask)

export default router