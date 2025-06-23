import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFF8F4" }}>
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              formButtonPrimary: "text-sm normal-case",
              card: "shadow-lg",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formFieldInput: "border border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              footerActionLink: "hover:text-blue-700",
            },
            variables: {
              colorPrimary: "#405DE9",
            },
          }}
        />
      </div>
    </div>
  )
}
