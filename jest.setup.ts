jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/features/auth/hooks/use-auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/lib/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));
