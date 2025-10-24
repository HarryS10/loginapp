import { auth } from "@/auth";
import RegisterForm from "@/component/RegisterForm";

export default async function RegisterPage() {
    const session = await auth();
    console.log("session:", session);
    return <RegisterForm />;
}
