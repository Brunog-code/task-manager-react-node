const express = require("express");
const router = express.Router();
const TaskModel = require("../models/task.model");

router.post("/", async (req, res) => {
  try {
    const task = await TaskModel.create({ //utilizar mesmo nome que no Schema (title e user)
      title: req.body.title,
      user: req.user.id // pega do token(middleware), não do front
    });
    res.status(201).json({msg: 'Tarefa adicionada com sucesso', task});
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    res.status(500).json({ message: "Erro ao adicionar tarefa." });
  }
});

router.get('/', async (req, res) => {
  try{
    const tasks = await TaskModel.find({user: req.user.id}) // busca as tarefas do usuário logado
      .sort({createdAt: -1}) // ordena as tarefas pela data de criação (mais recentes primeiro)
      .populate('user', 'name') // popula o campo 'user' com o nome do usuário
      .lean(); // converte o documento do Mongoose para um objeto JavaScript simples
      res.status(200).json({tasks}); // retorna as tarefas encontradas
  }catch(error){
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ message: "Erro ao buscar tarefas." });
  } 
})

router.delete('/:id', async(req, res) => {
  try{
    const taskId = req.params.id;
    const task = await TaskModel.findByIdAndDelete(taskId);
    if(!task) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    res.status(200).json({msg: 'Tarefa deletada com sucesso'});
  }catch(error){
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({ message: "Erro ao deletar tarefa." });
  }
})

router.patch('/:id', async(req, res) => {
  try{
    const taskId = req.params.id;
    const { completed, finalizedAt, title} = req.body; // espera receber o status de conclusão no corpo da requisição
    
    const updateData = {}
    if(completed !== undefined) updateData.completed = completed; // atualiza o status de conclusão
    if(finalizedAt !== undefined) updateData.finalizedAt = finalizedAt; // atualiza a data de finalização
    if(title !== undefined) updateData.title = title; // atualiza o título da tarefa

    const task = await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
    
    if(!task) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    
    res.status(200).json({msg: 'Status da tarefa atualizado com sucesso', task});
  }catch(error){
    console.error("Erro ao atualizar status da tarefa:", error);
    res.status(500).json({ message: "Erro ao atualizar status da tarefa." });
  }
})

module.exports = router;
