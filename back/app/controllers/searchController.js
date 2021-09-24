const Commune = require('../models/commune');

const searchController = {
  /**
   * Method sending the common search to the browser
   * @route /api/search/city
   * @method GET
   * @param {Request} request
   * @param {Response} response
   */
  findByName: async (request, response) => {
    try {
      console.log('test');
      if (request.query.ville) {
        console.log('query = ', request.query.ville);
        const { name } = request.query.ville;
        const commune = await Commune.findByName(name);
        response.json(commune);
      } else {
        response.status(400).json({ error: 'No query to execute ... 🤔' });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method that returns the commune by its code_insee
   * @route /api/search/city/:insee
   * @method GET
   * @param {Request} request
   * @param {Response} response
   */
  findByInsee: async (request, response) => {
    try {
      const { insee } = request.params;
      const commune = await Commune.findByCodeInsee(insee);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method sending a random common to the browser
   * @route /api/search/random
   * @method GET
   * @param {_} request
   * @param {Response} response
   */
  randomSearch: async (_, response) => {
    try {
      const commune = await Commune.randomSearch();
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method sending the common searches to the browser
   * @route /api/search/criteria
   * @method POST
   * @param {Request} request
   * @param {Response} response
   */
  findByCriteria: async (request, response) => {
    try {
      const params = request.body;
      const commune = await Commune.findByCriteria(params);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method cheking if city is a favorite, if not add it
   * @route /api/search/city/:insee/check
   * @method POST
   * @param {Request} request
   * @param {Response} response
   */
  addFavorite: async (request, response) => {
    try {
      const { insee } = request.params;
      const { user } = request.user;
      const { boolean } = request.query;
      const commune = await Commune.findByFavorite(insee);
      if (!commune) {
        await Commune.add(insee, user, boolean);
        // eslint-disable-next-line eqeqeq
      } else if (commune.is_favorite == boolean) {
        await Commune.delete();
        // if commune, then change or delete favorite or blacklist
        // change if is true in coming and register as false (the opposite also work)
        // delete if is true in coming and register as true (the opposite is true too)
      } else {
        await Commune.update();
      }
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};

module.exports = searchController;