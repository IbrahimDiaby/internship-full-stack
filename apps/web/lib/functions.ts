import { redirect } from 'next/navigation';

const logout = () => {
    localStorage.setItem("token", "");
    redirect("/auth");
}

export {
    logout
}