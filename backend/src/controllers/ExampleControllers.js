// src/controllers/UserController.js - Controlador de usuários
const UserModel = require('../models/UserModel');

class UserController {
  /**
   * Lista todos os usuários
   * GET /users
   */
  async index(req, res) {
    try {
      const { page = 1, limit = 10, active } = req.query;

      // Com paginação
      const result = await UserModel.paginate(
        parseInt(page),
        parseInt(limit)
      );

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar usuários'
      });
    }
  }

  /**
   * Busca um usuário específico
   * GET /users/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Remove o password antes de retornar
      delete user.password;

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário'
      });
    }
  }

  /**
   * Cria um novo usuário
   * POST /users
   */
  async store(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      // Validação básica
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Nome, email e senha são obrigatórios'
        });
      }

      // Verifica se o email já existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      // Cria o usuário
      const userId = await UserModel.create({
        name,
        email,
        password, // Em produção, use bcrypt para hash
        phone
      });

      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: { id: userId }
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário'
      });
    }
  }

  /**
   * Atualiza um usuário
   * PUT /users/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      // Verifica se o usuário existe
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Se está alterando o email, verifica se já existe
      if (email && email !== user.email) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Email já cadastrado por outro usuário'
          });
        }
      }

      // Atualiza o usuário
      await UserModel.update(id, { name, email, phone });

      return res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar usuário'
      });
    }
  }

  /**
   * Remove um usuário
   * DELETE /users/:id
   */
  async destroy(req, res) {
    try {
      const { id } = req.params;

      // Verifica se o usuário existe
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Remove o usuário (ou usa softDelete)
      await UserModel.softDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Usuário removido com sucesso'
      });
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao remover usuário'
      });
    }
  }

  /**
   * Busca usuários
   * GET /users/search?q=termo
   */
  async search(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Parâmetro de busca é obrigatório'
        });
      }

      const users = await UserModel.search(q);

      // Remove passwords
      users.forEach(user => delete user.password);

      return res.status(200).json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários'
      });
    }
  }
}

module.exports = new UserController();