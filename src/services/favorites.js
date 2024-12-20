import api from '@/plugins/axios';

class FavoritesService {
 
  async getFavoriteMovies(accountId, sessionId) {
    const { data } = await api.get(`account/${accountId}/favorite/movies`, {
      params: { session_id: sessionId },
    });
    return data;
  }

  async getFavoriteSeries(accountId, sessionId) {
    const { data } = await api.get(`account/${accountId}/favorite/tv`, {
      params: { session_id: sessionId },
    });
    return data;
  }

  async addFavoriteMovie(accountId, sessionId, movieId) {
    const { data } = await api.post(
      `account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: true,
      },
      { params: { session_id: sessionId } }
    );
    return data;
  }

  async addFavoriteSeries(accountId, sessionId, seriesId) {
    const { data } = await api.post(
      `account/${accountId}/favorite`,
      {
        media_type: 'tv',
        media_id: seriesId,
        favorite: true,
      },
      { params: { session_id: sessionId } }
    );
    return data;
  }

  async removeFavoriteMovie(accountId, sessionId, movieId) {
    const { data } = await api.post(
      `account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: false,
      },
      { params: { session_id: sessionId } }
    );
    return data;
  }

  async removeFavoriteSeries(accountId, sessionId, seriesId) {
    const { data } = await api.post(
      `account/${accountId}/favorite`,
      {
        media_type: 'tv',
        media_id: seriesId,
        favorite: false,
      },
      { params: { session_id: sessionId } }
    );
    return data;
  }
}

export default new FavoritesService();
