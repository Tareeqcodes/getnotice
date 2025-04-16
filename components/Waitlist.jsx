
"use client";


import { useForm, ValidationError } from "@formspree/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function Waitlist() {
  const [state, handleSubmit] = useForm("xldjovgl");

  if (state.succeeded) {
    return (
      <div className="text-green-400 text-center font-semibold text-lg">
        🎉 You're on the waitlist! We'll be in touch soon.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-md"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2"
      >
        {state.submitting ? "Submitting..." : "Join Waitlist"}{" "}
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
