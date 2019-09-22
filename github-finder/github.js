class GitHub {
  constructor() {
    this.client_id = "c7d6f2378862c6abf952";
    this.client_secret = "4983aaae068508181b09224e081bf4e1699212f8";
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();

    return {
      profile
    }
  }
}