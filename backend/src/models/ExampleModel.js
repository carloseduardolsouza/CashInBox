// src/models/UserModel.js - Model para interagir com a tabela de usuários
const { db } = require('../config/database');

class UserModel {
  constructor() {
    this.table = 'users';
  }

  /**
   * Busca todos os usuários
   * @param {Object} filters - Filtros opcionais
   * @returns {Promise<Array>}
   */
  async findAll(filters = {}) {
    const query = db(this.table).select('*');

    // Aplicar filtros se existirem
    if (filters.active !== undefined) {
      query.where('active', filters.active);
    }

    return await query;
  }

  /**
   * Busca um usuário por ID
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return await db(this.table)
      .where({ id })
      .first(); // Retorna apenas o primeiro resultado
  }

  /**
   * Busca um usuário por email
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  async findByEmail(email) {
    return await db(this.table)
      .where({ email })
      .first();
  }

  /**
   * Cria um novo usuário
   * @param {Object} userData
   * @returns {Promise<number>} - ID do usuário criado
   */
  async create(userData) {
    const [id] = await db(this.table).insert(userData);
    return id;
  }

  /**
   * Atualiza um usuário
   * @param {number} id
   * @param {Object} userData
   * @returns {Promise<number>} - Número de linhas afetadas
   */
  async update(id, userData) {
    // Atualiza o timestamp
    userData.updated_at = db.fn.now();
    
    return await db(this.table)
      .where({ id })
      .update(userData);
  }

  /**
   * Remove um usuário
   * @param {number} id
   * @returns {Promise<number>} - Número de linhas afetadas
   */
  async delete(id) {
    return await db(this.table)
      .where({ id })
      .del();
  }

  /**
   * Remove um usuário (soft delete)
   * @param {number} id
   * @returns {Promise<number>}
   */
  async softDelete(id) {
    return await this.update(id, { active: false });
  }

  /**
   * Conta total de usuários
   * @param {Object} filters
   * @returns {Promise<number>}
   */
  async count(filters = {}) {
    const query = db(this.table).count('* as total');

    if (filters.active !== undefined) {
      query.where('active', filters.active);
    }

    const result = await query.first();
    return result.total;
  }

  /**
   * Busca com paginação
   * @param {number} page - Página atual (começa em 1)
   * @param {number} limit - Itens por página
   * @returns {Promise<Object>}
   */
  async paginate(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [data, totalResult] = await Promise.all([
      db(this.table)
        .select('*')
        .limit(limit)
        .offset(offset),
      db(this.table).count('* as total').first()
    ]);

    const total = totalResult.total;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  /**
   * Busca usuários com busca por nome ou email
   * @param {string} searchTerm
   * @returns {Promise<Array>}
   */
  async search(searchTerm) {
    return await db(this.table)
      .where('name', 'like', `%${searchTerm}%`)
      .orWhere('email', 'like', `%${searchTerm}%`);
  }
}

// Exporta uma instância única (Singleton)
module.exports = new UserModel();