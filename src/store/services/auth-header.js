export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')).accessToken;
    if (user) {
      return  { Authorization: `Bearer ${user}` };
    } else {
      return {};
    }
  }
  