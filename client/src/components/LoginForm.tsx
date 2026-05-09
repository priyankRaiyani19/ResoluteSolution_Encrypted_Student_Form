import axios from "axios";
import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { API_ENDPOINTS } from "../utils/api";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  onAuthenticated: () => void;
}

const LoginForm = ({ onAuthenticated }: Props) => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [authMode, setAuthMode] =
    useState<"login" | "signup">(
      "login"
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [authMessage, setAuthMessage] =
    useState(
      "Use your email to check whether an account already exists."
    );

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setAuthMessage("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setAuthMessage(
        "Password must be at least 6 characters."
      );

      return;
    }

    setIsSubmitting(true);
    setAuthMessage("");

    if (authMode === "signup") {
      if (!fullName.trim()) {
        setAuthMessage("Enter your full name.");
        setIsSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        setAuthMessage("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }

      try {
        await axios.post(API_ENDPOINTS.signup, {
          fullName,
          email,
          password,
        });

        onAuthenticated();
      } catch (error: any) {
        const responseCode =
          error?.response?.data?.code;

        if (responseCode === "USER_EXISTS") {
          setAuthMode("login");
          setAuthMessage(
            "This account already exists. Please login."
          );
        } else {
          setAuthMessage(
            error?.response?.data?.message ||
              "Could not create account."
          );
        }
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    try {
      await axios.post(API_ENDPOINTS.login, {
        email,
        password,
      });

      onAuthenticated();
    } catch (error: any) {
      const responseCode =
        error?.response?.data?.code;

      if (responseCode === "USER_NOT_FOUND") {
        setAuthMode("signup");
        setFullName("");
        setConfirmPassword(password);
        setAuthMessage(
          "No account exists for that email. Create one to continue."
        );
      } else {
        setAuthMessage(
          error?.response?.data?.message ||
            "Unable to sign in."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="relative overflow-hidden rounded-[30px] bg-ink-950 px-6 py-6 text-left text-white shadow-[0_28px_65px_rgba(19,34,56,0.32)] sm:px-7"
      onSubmit={submitHandler}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            {authMode === "login" ? "Admin Access" : "Create Account"}
          </p>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              {authMode === "login"
                ? "Sign in to manage records."
                : "Finish creating your account."}
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
              {authMode === "login"
                ? "We check the database first. If the user does not exist, you will be moved to sign up."
                : "Enter your account details once, then continue into the dashboard."}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {authMode === "signup" ? (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Full Name
              </label>

              <input
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 focus:border-coral-400 focus:bg-white/10 focus:ring-4 focus:ring-coral-400/15"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Email
            </label>

            <input
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 focus:border-coral-400 focus:bg-white/10 focus:ring-4 focus:ring-coral-400/15"
              type="email"
              placeholder="student@example.edu"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              Password
            </label>

            <div className="flex gap-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 focus:border-coral-400 focus:bg-white/10 focus:ring-4 focus:ring-coral-400/15"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="rounded-2xl border border-white/10 bg-white/6 px-3 text-white/80 transition hover:bg-white/10"
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
              >
                {showPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {authMode === "signup" ? (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                Confirm Password
              </label>

              <div className="flex gap-2">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 focus:border-coral-400 focus:bg-white/10 focus:ring-4 focus:ring-coral-400/15"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="rounded-2xl border border-white/10 bg-white/6 px-3 text-white/80 transition hover:bg-white/10"
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {authMessage ? (
          <p className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/80">
            {authMessage}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-4 focus:ring-white/15"
            type="button"
            onClick={() => {
              if (authMode === "login") {
                setAuthMode("signup");
                setAuthMessage("Create a new account to continue.");
              } else {
                setAuthMode("login");
                setAuthMessage("Use your existing account to sign in.");
              }
            }}
          >
            {authMode === "login"
              ? "Go to Sign Up"
              : "Back to Login"}
          </button>

          <button
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition duration-200 hover:-translate-y-0.5 hover:bg-coral-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : authMode === "login"
                ? "Login"
                : "Create Account"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;