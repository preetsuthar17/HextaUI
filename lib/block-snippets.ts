export const blockSnippets = {
  "ai-chat-history": {
    usageImports: `import AIChatHistory from "@/registry/new-york/blocks/ai/ai-chat-history";`,
    usageCode: `<AIChatHistory
  conversations={[
    {
      id: "conv-1",
      title: "React Component Patterns",
      lastMessage: "How do I create reusable components?",
      lastMessageAt: new Date(),
      messageCount: 12,
      isActive: true,
    },
  ]}
  activeConversationId="conv-1"
  onSelect={(id) => {
    /* select conversation logic */
  }}
  onNewConversation={() => {
    /* create new conversation */
  }}
  onRename={async (id, newName) => {
    /* rename logic */
  }}
  onDelete={async (id) => {
    /* delete logic */
  }}
/>`,
  },
  "ai-citations": {
    usageImports: `import AICitations from "@/registry/new-york/blocks/ai/ai-citations";`,
    usageCode: `<AICitations
  citations={[
    {
      id: "citation-1",
      number: 1,
      text: "React component patterns",
      sources: [
        {
          id: "source-1",
          title: "React Component Patterns - Best Practices",
          url: "https://react.dev/learn/thinking-in-react",
          domain: "react.dev",
          snippet: "Components let you split the UI into independent, reusable pieces.",
          author: "React Team",
          publishedAt: new Date("2024-01-15"),
          type: "web",
        },
      ],
    },
  ]}
  onSourceClick={(sourceId) => {
    /* open citation source */
  }}
/>`,
  },
  "ai-conversation": {
    usageImports: `import AIConversation from "@/registry/new-york/blocks/ai/ai-conversation";`,
    usageCode: `<AIConversation
  messages={[
    {
      id: "1",
      role: "user",
      content: "What is HextaUI?",
      timestamp: new Date(),
    },
    {
      id: "2",
      role: "assistant",
      content: "HextaUI is a modern UI component library for Next.js applications.",
      timestamp: new Date(),
    },
  ]}
  isStreaming={false}
  isThinking={false}
  onEdit={(id) => {
    /* edit message by id */
  }}
  onRegenerate={(id) => {
    /* regenerate reply for a given id */
  }}
/>`,
  },
  "ai-error-handler": {
    usageImports: `import AIErrorHandler from "@/registry/new-york/blocks/ai/ai-error-handler";`,
    usageCode: `<AIErrorHandler
  error={{
    code: "network_error",
    message: "Network unreachable. Please check your connection and retry.",
  }}
  onRetry={async () => {
    /* retry logic example */
  }}
  onDismiss={() => {
    /* dismiss error panel */
  }}
  onContactSupport={() => {
    /* contact support logic */
  }}
/>`,
  },
  "ai-file-upload": {
    usageImports: `import AIFileUpload from "@/registry/new-york/blocks/ai/ai-file-upload";`,
    usageCode: `<AIFileUpload
  onUpload={(files) => {
    /* handle file upload */
  }}
  maxSize={10 * 1024 * 1024}
  acceptedTypes={["pdf", "txt", "docx"]}
/>`,
  },
  "ai-message": {
    usageImports: `import AIMessage from "@/registry/new-york/blocks/ai/ai-message";`,
    usageCode: `<AIMessage
  content="# Welcome to HextaUI

HextaUI is a modern UI component library for Next.js applications.

## Features

- **Copy & Paste Components**: Just copy and use instantly!
- **Fully Customizable**: Tailwind CSS + extensive props
- **Type-Safe**: Full TypeScript support"
  isStreaming={false}
  onEdit={() => {
    /* edit message */
  }}
  onRegenerate={() => {
    /* regenerate message */
  }}
/>`,
  },
  "ai-model-selector": {
    usageImports: `import AIModelSelector from "@/registry/new-york/blocks/ai/ai-model-selector";`,
    usageCode: `<AIModelSelector
  models={[
      {
        id: "gpt-4o",
        name: "GPT-4o",
        provider: "openai",
        description: "Most capable model",
        features: ["fast", "multimodal", "long-context"],
      },
      {
        id: "gpt-4o-mini",
        name: "GPT-4o Mini",
        provider: "openai",
        description: "Fast and affordable",
        features: ["fast"],
      },
      {
        id: "gpt-4o-2024-11-20",
        name: "GPT-4o (2024-11-20)",
        provider: "openai",
        description: "Latest GPT-4o snapshot",
        features: ["fast", "multimodal", "long-context"],
      },
      {
        id: "o1",
        name: "o1",
        provider: "openai",
        description: "Advanced reasoning",
        features: ["reasoning"],
      },
      {
        id: "o1-preview",
        name: "o1 Preview",
        provider: "openai",
        description: "Advanced reasoning preview",
        features: ["reasoning"],
        isPreview: true,
      },
      {
        id: "o1-mini",
        name: "o1 Mini",
        provider: "openai",
        description: "Fast reasoning",
        features: ["fast", "reasoning"],
      },
      {
        id: "o1-mini-preview",
        name: "o1 Mini Preview",
        provider: "openai",
        description: "Fast reasoning preview",
        features: ["fast", "reasoning"],
        isPreview: true,
      },
      {
        id: "gpt-4-turbo",
        name: "GPT-4 Turbo",
        provider: "openai",
        description: "High performance model",
        features: ["turbo", "multimodal", "long-context"],
      },
      {
        id: "gpt-4-turbo-preview",
        name: "GPT-4 Turbo Preview",
        provider: "openai",
        description: "Latest GPT-4 Turbo",
        features: ["turbo", "multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "gpt-4",
        name: "GPT-4",
        provider: "openai",
        description: "Original GPT-4 model",
        features: ["multimodal", "long-context"],
      },
      {
        id: "gpt-4-32k",
        name: "GPT-4 32K",
        provider: "openai",
        description: "GPT-4 with extended context",
        features: ["long-context"],
      },
      {
        id: "gpt-3.5-turbo",
        name: "GPT-3.5 Turbo",
        provider: "openai",
        description: "Fast and efficient",
        features: ["turbo"],
      },
      {
        id: "gpt-3.5-turbo-16k",
        name: "GPT-3.5 Turbo 16K",
        provider: "openai",
        description: "GPT-3.5 with extended context",
        features: ["turbo", "long-context"],
      },
      {
        id: "claude-4-opus",
        name: "Claude 4 Opus",
        provider: "anthropic",
        description: "Most capable model",
        features: ["reasoning", "multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "claude-4-sonnet",
        name: "Claude 4 Sonnet",
        provider: "anthropic",
        description: "Balanced performance",
        features: ["fast", "multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "claude-3.5-sonnet",
        name: "Claude 3.5 Sonnet",
        provider: "anthropic",
        description: "Fast and intelligent",
        features: ["fast", "multimodal"],
      },
      {
        id: "claude-3.5-sonnet-20241022",
        name: "Claude 3.5 Sonnet (2024-10-22)",
        provider: "anthropic",
        description: "Latest Claude 3.5 Sonnet",
        features: ["fast", "multimodal"],
      },
      {
        id: "claude-3.5-haiku",
        name: "Claude 3.5 Haiku",
        provider: "anthropic",
        description: "Fastest Claude model",
        features: ["fast", "multimodal"],
      },
      {
        id: "claude-3-opus",
        name: "Claude 3 Opus",
        provider: "anthropic",
        description: "Most powerful model",
        features: ["reasoning", "multimodal", "long-context"],
      },
      {
        id: "claude-3-sonnet",
        name: "Claude 3 Sonnet",
        provider: "anthropic",
        description: "Balanced Claude 3",
        features: ["multimodal", "long-context"],
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        provider: "anthropic",
        description: "Fast and cost-effective",
        features: ["fast", "multimodal"],
      },
      {
        id: "claude-3-5-sonnet-20240620",
        name: "Claude 3.5 Sonnet (2024-06-20)",
        provider: "anthropic",
        description: "Claude 3.5 Sonnet snapshot",
        features: ["fast", "multimodal"],
      },
      {
        id: "gemini-2.0-pro",
        name: "Gemini 2.0 Pro",
        provider: "google",
        description: "Advanced capabilities",
        features: ["multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "gemini-2.0-flash",
        name: "Gemini 2.0 Flash",
        provider: "google",
        description: "Fast Gemini 2.0",
        features: ["fast", "multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "gemini-1.5-pro",
        name: "Gemini 1.5 Pro",
        provider: "google",
        description: "Multimodal model",
        features: ["multimodal", "long-context"],
      },
      {
        id: "gemini-1.5-pro-latest",
        name: "Gemini 1.5 Pro Latest",
        provider: "google",
        description: "Latest Gemini 1.5 Pro",
        features: ["multimodal", "long-context"],
      },
      {
        id: "gemini-1.5-flash",
        name: "Gemini 1.5 Flash",
        provider: "google",
        description: "Fast and efficient",
        features: ["fast", "multimodal", "long-context"],
      },
      {
        id: "gemini-1.5-flash-8b",
        name: "Gemini 1.5 Flash 8B",
        provider: "google",
        description: "Lightweight Flash model",
        features: ["fast", "multimodal"],
      },
      {
        id: "gemini-1.0-pro",
        name: "Gemini 1.0 Pro",
        provider: "google",
        description: "Original Gemini Pro",
        features: ["multimodal"],
      },
      {
        id: "gemini-ultra",
        name: "Gemini Ultra",
        provider: "google",
        description: "Most capable model",
        features: ["reasoning", "multimodal", "long-context"],
        isPreview: true,
      },
      {
        id: "llama-3.1-405b",
        name: "Llama 3.1 405B",
        provider: "meta",
        description: "Open source model",
        features: ["long-context"],
      },
      {
        id: "llama-3.1-70b",
        name: "Llama 3.1 70B",
        provider: "meta",
        description: "Balanced performance",
        features: ["fast", "long-context"],
      },
      {
        id: "llama-3.1-8b",
        name: "Llama 3.1 8B",
        provider: "meta",
        description: "Lightweight model",
        features: ["fast"],
      },
      {
        id: "llama-3.2",
        name: "Llama 3.2",
        provider: "meta",
        description: "Latest open source",
        features: ["fast"],
        isNew: true,
      },
      {
        id: "llama-3.2-3b",
        name: "Llama 3.2 3B",
        provider: "meta",
        description: "Ultra-lightweight",
        features: ["fast"],
        isNew: true,
      },
      {
        id: "llama-3.2-1b",
        name: "Llama 3.2 1B",
        provider: "meta",
        description: "Smallest Llama model",
        features: ["fast"],
        isNew: true,
      },
      {
        id: "llama-3-70b",
        name: "Llama 3 70B",
        provider: "meta",
        description: "Llama 3 base model",
        features: ["fast"],
      },
      {
        id: "llama-3-8b",
        name: "Llama 3 8B",
        provider: "meta",
        description: "Llama 3 lightweight",
        features: ["fast"],
      },
      {
        id: "mistral-large",
        name: "Mistral Large",
        provider: "mistral",
        description: "High performance",
        features: ["fast", "long-context"],
      },
      {
        id: "mistral-large-2407",
        name: "Mistral Large 2407",
        provider: "mistral",
        description: "Mistral Large snapshot",
        features: ["fast", "long-context"],
      },
      {
        id: "mistral-large-2402",
        name: "Mistral Large 2402",
        provider: "mistral",
        description: "Mistral Large snapshot",
        features: ["fast", "long-context"],
      },
      {
        id: "mistral-medium",
        name: "Mistral Medium",
        provider: "mistral",
        description: "Balanced capabilities",
        features: ["fast"],
      },
      {
        id: "mistral-small",
        name: "Mistral Small",
        provider: "mistral",
        description: "Fast and efficient",
        features: ["fast"],
      },
      {
        id: "mistral-small-2402",
        name: "Mistral Small 2402",
        provider: "mistral",
        description: "Mistral Small snapshot",
        features: ["fast"],
      },
      {
        id: "mistral-tiny",
        name: "Mistral Tiny",
        provider: "mistral",
        description: "Ultra-fast model",
        features: ["fast"],
      },
      {
        id: "pixtral-large",
        name: "Pixtral Large",
        provider: "mistral",
        description: "Multimodal vision model",
        features: ["multimodal", "long-context"],
        isNew: true,
      },
      {
        id: "pixtral-12b",
        name: "Pixtral 12B",
        provider: "mistral",
        description: "Efficient vision model",
        features: ["fast", "multimodal"],
        isNew: true,
      },
  ]}
  selectedModelId="gpt-4o"
  onModelSelect={(model) => {
    /* select model - receives full model object */
    console.log("Selected model:", model);
  }}
  isLoading={false}
/>`,
  },
  "ai-prompt-input": {
    usageImports: `import AIPromptInput from "@/registry/new-york/blocks/ai/ai-prompt-input";`,
    usageCode: `<AIPromptInput
  onSend={(text) => {
    /* send prompt logic with value: text */
  }}
  placeholder="Type your prompt here (e.g. Summarize this article)..."
  disabled={false}
  autoFocus={true}
/>`,
  },
  "ai-prompt-templates": {
    usageImports: `import AIPromptTemplates from "@/registry/new-york/blocks/ai/ai-prompt-templates";`,
    usageCode: `<AIPromptTemplates
  templates={[
  {
      id: "template-1",
      name: "Meeting Notes Summarizer",
      description: "Summarize meeting notes into key points and action items.",
      category: "Business",
      prompt:
        "Summarize the following meeting notes into concise bullet points and list the action items at the end:\n\n{meetingNotes}\n\nUse clear, professional language.",
      variables: [
        {
          name: "meetingNotes",
          label: "Meeting Notes",
          placeholder: "Paste raw meeting notes here…",
          required: true,
        },
      ],
      usageCount: 217,
      tags: ["summary", "meeting", "action items"],
    },
    {
      id: "template-2",
      name: "Customer Support Reply",
      description: "Generate a helpful response to a customer support ticket.",
      category: "Business",
      prompt:
        "Draft a professional and empathetic response to the following customer inquiry:\n\n{customerMessage}\n\nAddress the concerns politely and suggest next steps.",
      variables: [
        {
          name: "customerMessage",
          label: "Customer Message",
          placeholder: "Paste customer inquiry here…",
          required: true,
        },
      ],
      usageCount: 181,
      isFavorite: true,
      tags: ["support", "reply", "email"],
    },
    {
      id: "template-3",
      name: "Bug Report Formatter",
      description: "Format raw bug details into a structured bug report.",
      category: "Code",
      prompt:
        "Format the following bug details into a structured software bug report with steps to reproduce, expected behavior, and actual behavior:\n\n{rawBugDetails}\n\nKeep it clear and concise.",
      variables: [
        {
          name: "rawBugDetails",
          label: "Raw Bug Details",
          placeholder: "Paste or describe the bug here…",
          required: true,
        },
      ],
      usageCount: 95,
      tags: ["bug", "report", "QA"],
    },
    {
      id: "template-4",
      name: "Sales Email Generator",
      description: "Create a persuasive sales outreach email.",
      category: "Business",
      prompt:
        "Write a concise and persuasive sales email to {recipientType} about {productOrService}. Mention key benefits and include a clear call to action.",
      variables: [
        {
          name: "recipientType",
          label: "Recipient Type",
          placeholder: "e.g., decision maker at Acme Corp…",
          required: true,
        },
        {
          name: "productOrService",
          label: "Product/Service",
          placeholder: "e.g., new project management SaaS…",
          required: true,
        },
      ],
      usageCount: 133,
      tags: ["email", "sales", "communication"],
    },
    {
      id: "template-5",
      name: "Git Commit Message Generator",
      description: "Suggest a clear, conventional Git commit message.",
      category: "Code",
      prompt:
        "Given the following code changes summary, suggest a clear and conventional Git commit message following present tense and imperative mood:\n\n{changeSummary}",
      variables: [
        {
          name: "changeSummary",
          label: "Code Change Summary",
          placeholder: "Describe your code change…",
          required: true,
        },
      ],
      usageCount: 154,
      tags: ["git", "commit", "code"],
    },
    {
      id: "template-6",
      name: "Resume Achievement Bullet Generator",
      description:
        "Turn work activity descriptions into measurable resume bullets.",
      category: "Writing",
      prompt:
        "Rewrite the following work activities as impactful resume achievement bullets. Focus on accomplishments and quantify results when possible:\n\n{workDetails}",
      variables: [
        {
          name: "workDetails",
          label: "Work Activities",
          placeholder: "E.g., Managed a project that launched on time…",
          required: true,
        },
      ],
      usageCount: 142,
      tags: ["resume", "career", "writing"],
    },
  ]}
  categories={["All", "Writing", "Code", "Analysis"]}
  onSelect={(templateId) => {
    /* select template by id */
  }}
  onFavorite={async (id, fav) => {
    /* set/unset favorite */
  }}
  onCreate={(tpl) => {
    /* create new template */
  }}
/>`,
  },
  "ai-settings-panel": {
    usageImports: `import AISettingsPanel from "@/registry/new-york/blocks/ai/ai-settings-panel";`,
    usageCode: `<AISettingsPanel
  settings: {
    temperature: 0.6,
    maxTokens: 1500,
    topP: 0.9,
    topK: 40,
    frequencyPenalty: 0.1,
    presencePenalty: 0.0,
    systemPrompt:
      "You are an AI assistant that helps answer user questions clearly and helpfully.",
    model: "gpt-3.5-turbo",
  } as AISettings,
  onSettingsChange: (settings: Partial<AISettings>) => {
    console.log("Settings changed:", settings);
  },
  onSave: async (settings: Partial<AISettings>) => {
    console.log("Settings saved:", settings);
  },
  onReset: () => {
    console.log("Settings reset to defaults");
  },
  availableModels: [
    "gpt-3.5-turbo",
    "gpt-4",
    "gpt-4o",
    "claude-3-opus",
    "llama-3-70b",
  ],
  presets: [
    {
      name: "Quick Q&A",
      settings: {
        temperature: 0.3,
        maxTokens: 800,
        model: "gpt-3.5-turbo",
        systemPrompt: "Answer questions briefly and factually.",
      },
    },
    {
      name: "Long-form Assist",
      settings: {
        temperature: 0.8,
        maxTokens: 2500,
        model: "gpt-4",
        systemPrompt: "Provide detailed explanations and full sentences.",
      },
    },
  ],
  onLoadPreset: (presetName: string) => {
    console.log(\`Loaded preset: $\{presetName}\`);
  },
  onSavePreset: async (preset: any) => {
    console.log(\`Preset saved: $\{preset}\`);
  },
  onDeletePreset: async (presetName: string) => {
    console.log(\`Deleted preset: $\{presetName}\`);
  },
  showAdvanced: true,
  };
/>`,
  },
  "ai-streaming-response": {
    usageImports: `import AIStreamingResponse from "@/registry/new-york/blocks/ai/ai-streaming-response";`,
    usageCode: `<AIStreamingResponse
  content="# Streaming Response

This is a demonstration of real-time token-by-token streaming."
  autoStart={true}
  onComplete={() => {
    /* streaming completed */
  }}
/>`,
  },
  "ai-suggested-prompts": {
    usageImports: `import AISuggestedPrompts from "@/registry/new-york/blocks/ai/ai-suggested-prompts";`,
    usageCode: `<AISuggestedPrompts
  prompts={[
    {
      id: "prompt-1",
      title: "Write a blog post",
      prompt: "Write a comprehensive blog post about [topic]",
      category: "Writing",
      description: "Generate a well-structured blog post",
      isPopular: true,
      usageCount: 245,
    },
  ]}
  onSelect={(promptId) => {
    /* choose prompt */
  }}
  showSearch={true}
  showCategories={true}
/>`,
  },
  "ai-thinking": {
    usageImports: `import AIThinking from "@/registry/new-york/blocks/ai/ai-thinking";`,
    usageCode: `<AIThinking
  spinner={true}
  message="Let me think of the best answer..."
/>`,
  },
  "ai-usage-quota": {
    usageImports: `import AIUsageQuota from "@/registry/new-york/blocks/ai/ai-usage-quota";`,
    usageCode: `<AIUsageQuota
  tokenUsage={{
    input: 225_000,
    output: 178_700,
    total: 403_700,
    dailyUsageHistory: [],
  }}
  rateLimit={{
    remaining: 7,
    limit: 100,
    resetAt: new Date(),
    window: "hour",
  }}
  quota={{
    used: 9_590_000,
    limit: 10_000_000,
    resetAt: new Date(),
    period: "month",
  }}
  showUpgradePrompt={true}
  upgradeThreshold={80}
  onUpgrade={() => {
    /* upgrade logic */
  }}
/>`,
  },
  "auth-account-delete": {
    usageImports: `import AuthAccountDelete from "@/registry/new-york/blocks/auth/auth-account-delete";`,
    usageCode: `<AuthAccountDelete
  onDelete={async () => {
    /* delete user account */
  }}
  confirmText="DELETE"
  info="This action cannot be undone. All your data will be erased."
/>`,
  },
  "auth-change-password": {
    usageImports: `import AuthChangePassword from "@/registry/new-york/blocks/auth/auth-change-password";`,
    usageCode: `<AuthChangePassword
  onSubmit={async ({ current, next, confirm }) => {
    /* change password */
  }}
/>`,
  },
  "auth-email-change": {
    usageImports: `import AuthEmailChange from "@/registry/new-york/blocks/auth/auth-email-change";`,
    usageCode: `<AuthEmailChange
  currentEmail="user@example.com"
  onSubmit={async ({ newEmail }) => {
    /* change email */
  }}
/>`,
  },
  "auth-forgot-password": {
    usageImports: `import AuthForgotPassword from "@/registry/new-york/blocks/auth/auth-forgot-password";`,
    usageCode: `<AuthForgotPassword
  onSubmit={async ({ email }) => {
    /* send reset link */
  }}
  onBackToLogin={() => {
    /* nav back to login */
  }}
  emailPlaceholder="Enter your email address"
/>`,
  },
  "auth-login-form": {
    usageImports: `import AuthLoginForm from "@/registry/new-york/blocks/auth/auth-login-form";`,
    usageCode: `<AuthLoginForm
  onSubmit={async ({ email, password, remember }) => {
    /* demo login */
  }}
  onSocialLogin={(provider) => {
    /* social login */
  }}
  showRememberMe={true}
  showSocialLogin={true}
  emailPlaceholder="your@email.com"
/>`,
  },
  "auth-magic-link": {
    usageImports: `import AuthMagicLink from "@/registry/new-york/blocks/auth/auth-magic-link";`,
    usageCode: `<AuthMagicLink
  onSubmit={async ({ email }) => {
    /* send magic link */
  }}
  onResend={() => {
    /* resend magic link */
  }}
  status="pending"
  infoText="Check your inbox for a sign-in link."
/>`,
  },
  "auth-otp-verify": {
    usageImports: `import AuthOTPVerify from "@/registry/new-york/blocks/auth/auth-otp-verify";`,
    usageCode: `<AuthOTPVerify
  deliveryMethod="email"
  deliveryAddress="user@example.com"
  onSubmit={async ({ code }) => {
    /* verify otp */
  }}
  onResend={() => {
    /* resend code */
  }}
/>`,
  },
  "auth-phone-verify": {
    usageImports: `import AuthPhoneVerify from "@/registry/new-york/blocks/auth/auth-phone-verify";`,
    usageCode: `<AuthPhoneVerify
  phoneNumber="+1234567890"
  onSubmit={async ({ code }) => {
    /* verify sms */
  }}
  onResend={() => {
    /* resend sms */
  }}
  status="pending"
/>`,
  },
  "auth-recovery-codes": {
    usageImports: `import AuthRecoveryCodes from "@/registry/new-york/blocks/auth/auth-recovery-codes";`,
    usageCode: `<AuthRecoveryCodes
  codes={["173839", "572048", "208453", "983242"]}
  onRegenerate={async () => {
    /* regenerate demo codes */
  }}
  onDownload={() => {
    /* download demo codes */
  }}
  showWarning={true}
/>`,
  },
  "auth-reset-password": {
    usageImports: `import AuthResetPassword from "@/registry/new-york/blocks/auth/auth-reset-password";`,
    usageCode: `<AuthResetPassword
  onSubmit={async ({ password, confirm }) => {
    /* reset password logic */
  }}
  token="example-token-sent-via-email"
  showPasswordStrength={true}
/>`,
  },
  "auth-session-manager": {
    usageImports: `import AuthSessionManager from "@/registry/new-york/blocks/auth/auth-session-manager";`,
    usageCode: `<AuthSessionManager
  sessions={[
    {
      id: "session-1",
      deviceType: "desktop",
      deviceName: "MacBook Pro",
      browser: "Chrome",
      location: "San Francisco, CA",
      lastActive: new Date(),
      isCurrent: true,
    },
  ]}
  onRevoke={(id) => {
    /* revoke single session */
  }}
  onRevokeAll={() => {
    /* revoke all sessions */
  }}
/>`,
  },
  "auth-signup-form": {
    usageImports: `import AuthSignupForm from "@/registry/new-york/blocks/auth/auth-signup-form";`,
    usageCode: `<AuthSignupForm
  onSubmit={async ({ email, password, confirm }) => {
    /* signup logic */
  }}
  onSocialLogin={(provider) => {
    /* signup with provider */
  }}
  showSocialLogin={true}
/>`,
  },
  "auth-social-accounts": {
    usageImports: `import AuthSocialAccounts from "@/registry/new-york/blocks/auth/auth-social-accounts";`,
    usageCode: `<AuthSocialAccounts
  connectedAccounts={[
    {
      id: "acct-google",
      provider: "google",
      email: "john.doe@gmail.com",
    },
  ]}
  availableProviders={["google", "github", "twitter"]}
  onConnect={async (prov) => {
    /* connect social provider */
  }}
  onDisconnect={async (prov) => {
    /* disconnect provider */
  }}
/>`,
  },
  "auth-two-factor-setup": {
    usageImports: `import AuthTwoFactorSetup from "@/registry/new-york/blocks/auth/auth-two-factor-setup";`,
    usageCode: `<AuthTwoFactorSetup
  qrUrl="/static/2fa-qr.png"
  secret="JFVHK324HKJS"
  onComplete={async ({ code }) => {
    /* complete 2fa setup */
  }}
/>`,
  },
  "auth-two-factor-verify": {
    usageImports: `import AuthTwoFactorVerify from "@/registry/new-york/blocks/auth/auth-two-factor-verify";`,
    usageCode: `<AuthTwoFactorVerify
  onSubmit={async ({ code }) => {
    /* verify two-factor code */
  }}
/>`,
  },
  "auth-verify-email": {
    usageImports: `import AuthVerifyEmail from "@/registry/new-york/blocks/auth/auth-verify-email";`,
    usageCode: `<AuthVerifyEmail
  email="user@example.com"
  status="pending"
  onResend={async () => {
    /* resend email */
  }}
  onVerify={() => {
    /* verify email link */
  }}
  infoText="Verification link sent to your email."
/>`,
  },
  "billing-billing-history": {
    usageImports: `import BillingBillingHistory from "@/registry/new-york/blocks/billing/billing-billing-history";`,
    usageCode: `<BillingBillingHistory
  transactions={[
    {
      id: "txn-1",
      date: new Date(),
      amount: 29,
      type: "payment",
      status: "success",
      description: "Subscription - Pro Plan",
    },
  ]}
  onViewDetails={(txnId) => {
    /* view transaction */
  }}
/>`,
  },
  "billing-coupon-code": {
    usageImports: `import BillingCouponCode from "@/registry/new-york/blocks/billing/billing-coupon-code";`,
    usageCode: `<BillingCouponCode
  onApply={async (code) => {
    /* apply coupon code */
  }}
  placeholder="Enter coupon code..."
  discountInfo="Save 20% with WELCOME20"
/>`,
  },
  "billing-invoice-details": {
    usageImports: `import BillingInvoiceDetails from "@/registry/new-york/blocks/billing/billing-invoice-details";`,
    usageCode: `<BillingInvoiceDetails
  invoice={{
    id: "inv-1",
    invoiceNumber: "INV-2024-001",
    date: new Date(),
    dueDate: new Date(),
    amount: 29,
    currency: "USD",
    status: "paid",
    description: "Pro Plan - January 2024",
    lineItems: [
      {
        description: "Pro Plan Subscription",
        quantity: 1,
        unitPrice: 29,
        subtotal: 29,
      },
    ],
    subtotal: 29,
    tax: { amount: 0, rate: 0, label: "No tax" },
    total: 29,
    paymentMethod: { type: "card", last4: "4242", brand: "visa" },
    billingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
  }}
  open={true}
  onOpenChange={(open) => {
    /* handle open/close */
  }}
  onDownload={() => {
    /* download invoice */
  }}
  currency="USD"
/>`,
  },
  "billing-invoice-list": {
    usageImports: `import BillingInvoiceList from "@/registry/new-york/blocks/billing/billing-invoice-list";`,
    usageCode: `<BillingInvoiceList
  invoices={[
    {
      id: "inv-1",
      invoiceNumber: "INV-2024-001",
      date: new Date(),
      amount: 29,
      currency: "USD",
      status: "paid",
    },
  ]}
  onViewInvoice={(id) => {
    /* view invoice details */
  }}
  onDownloadInvoice={(id) => {
    /* download invoice */
  }}
/>`,
  },
  "billing-payment-failed": {
    usageImports: `import BillingPaymentFailed from "@/registry/new-york/blocks/billing/billing-payment-failed";`,
    usageCode: `<BillingPaymentFailed
  failure={{
    invoiceId: "inv-1",
    invoiceNumber: "INV-2024-001",
    amount: 29,
    currency: "USD",
    failedAt: new Date(),
    reason: "insufficient_funds",
    reasonMessage: "Your payment method was declined due to insufficient funds.",
    paymentMethod: { type: "card", last4: "4242", brand: "visa" },
    retryAttempts: 1,
    maxRetryAttempts: 3,
  }}
  onRetry={async () => {
    /* retry payment */
  }}
  onUpdatePaymentMethod={() => {
    /* update method */
  }}
  onContactSupport={() => {
    /* contact support */
  }}
  currency="USD"
/>`,
  },
  "billing-payment-form": {
    usageImports: `import BillingPaymentForm from "@/registry/new-york/blocks/billing/billing-payment-form";`,
    usageCode: `<BillingPaymentForm
  onSubmit={async ({ cardNumber, exp, cvc }) => {
    /* submit payment */
  }}
  onCancel={() => {
    /* cancel payment form */
  }}
  supportedBrands={["visa", "mastercard", "amex"]}
/>`,
  },
  "billing-payment-method": {
    usageImports: `import BillingPaymentMethod from "@/registry/new-york/blocks/billing/billing-payment-method";`,
    usageCode: `<BillingPaymentMethod
  paymentMethods={[
    {
      id: "pm-1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ]}
  onAdd={() => {
    /* add payment method */
  }}
  onSetDefault={(pmId) => {
    /* set default method */
  }}
  onRemove={(pmId) => {
    /* remove method */
  }}
/>`,
  },
  "billing-payment-schedule": {
    usageImports: `import BillingPaymentSchedule from "@/registry/new-york/blocks/billing/billing-payment-schedule";`,
    usageCode: `<BillingPaymentSchedule
  payments={[
    {
      id: "sch-1",
      date: new Date(),
      amount: 29,
      currency: "USD",
      status: "upcoming",
      description: "Pro Plan - February 2024",
      paymentMethod: { type: "card", last4: "4242", brand: "visa" },
      invoiceId: "inv-2",
      invoiceNumber: "INV-2024-002",
    },
  ]}
  onViewInvoice={(invoiceId) => {
    /* view invoice */
  }}
  onRetry={async (paymentId) => {
    /* retry payment */
  }}
  currency="USD"
/>`,
  },
  "billing-plan-selector": {
    usageImports: `import BillingPlanSelector from "@/registry/new-york/blocks/billing/billing-plan-selector";`,
    usageCode: `<BillingPlanSelector
  plans={[
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      currency: "USD",
      features: [
        { name: "1,000 API requests/month", included: true },
        { name: "5 GB storage", included: true },
      ],
      isCurrent: true,
      ctaLabel: "Current plan",
    },
  ]}
  selectedPlanId="free"
  billingPeriod="monthly"
  onBillingPeriodChange={(period) => {
    /* change billing period */
  }}
  onPlanSelect={(planId) => {
    /* select plan by id */
  }}
/>`,
  },
  "billing-pricing-table": {
    usageImports: `import BillingPricingTable from "@/registry/new-york/blocks/billing/billing-pricing-table";`,
    usageCode: `<BillingPricingTable
  plans={[
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      currency: "USD",
      features: [
        {
          name: "Community support",
          values: { free: true, pro: true, enterprise: true },
        },
      ],
      isPopular: false,
    },
  ]}
  billingPeriod="monthly"
  onBillingPeriodChange={(period) => {
    /* change billing period */
  }}
  onSelectPlan={(planId) => {
    /* select plan */
  }}
/>`,
  },
  "billing-subscription-card": {
    usageImports: `import BillingSubscriptionCard from "@/registry/new-york/blocks/billing/billing-subscription-card";`,
    usageCode: `<BillingSubscriptionCard
  plan={{
    id: "pro",
    name: "Pro",
    price: 29,
    currency: "USD",
    billingPeriod: "monthly",
  }}
  usage={[
    {
      label: "API Requests",
      used: 85_000,
      limit: 100_000,
      unit: "requests",
      warningThreshold: 80,
    },
  ]}
  nextBillingDate={new Date()}
  autoRenew={true}
  status="active"
  onUpgrade={() => {
    /* upgrade plan */
  }}
  onManage={() => {
    /* manage subscription */
  }}
/>`,
  },
  "billing-subscription-settings": {
    usageImports: `import BillingSubscriptionSettings from "@/registry/new-york/blocks/billing/billing-subscription-settings";`,
    usageCode: `<BillingSubscriptionSettings
  subscription={{
    id: "sub-1",
    planName: "Pro Plan",
    status: "active",
    billingPeriod: "monthly",
    currentBillingDate: new Date(),
    nextBillingDate: new Date(),
    autoRenew: true,
  }}
  onPause={async (resumeDate) => {
    /* pause subscription */
  }}
  onCancel={async (feedback) => {
    /* cancel subscription */
  }}
  currency="USD"
/>`,
  },
  "billing-upgrade-prompt": {
    usageImports: `import BillingUpgradePrompt from "@/registry/new-york/blocks/billing/billing-upgrade-prompt";`,
    usageCode: `<BillingUpgradePrompt
  currentPlan={{ id: "free", name: "Free" }}
  recommendedPlan={{
    id: "pro",
    name: "Pro",
    price: 29,
    currency: "USD",
    billingPeriod: "monthly",
  }}
  features={[
    { name: "Unlimited API requests" },
    { name: "1 TB storage" },
  ]}
  reason="recommended"
  onUpgrade={() => {
    /* upgrade to recommended plan */
  }}
/>`,
  },
  "billing-usage-alerts": {
    usageImports: `import BillingUsageAlerts from "@/registry/new-york/blocks/billing/billing-usage-alerts";`,
    usageCode: `<BillingUsageAlerts
  alerts={[
    {
      id: "alert-1",
      name: "API Usage Alert",
      category: "API Requests",
      threshold: 80,
      thresholdType: "percentage",
      enabled: true,
      channels: ["email", "in_app"],
      lastTriggered: new Date(),
      triggerCount: 3,
    },
  ]}
  onToggle={async (alertId, enabled) => {
    /* toggle alert */
  }}
  onEdit={(alertId) => {
    /* edit alert */
  }}
  onCreate={() => {
    /* create new alert */
  }}
/>`,
  },
  "billing-usage-billing": {
    usageImports: `import BillingUsageBilling from "@/registry/new-york/blocks/billing/billing-usage-billing";`,
    usageCode: `<BillingUsageBilling
  currentPeriod={{
    start: new Date(),
    end: new Date(),
    usage: 8_500_000,
    limit: 10_000_000,
  }}
  previousPeriod={{
    usage: 7_200_000,
    limit: 10_000_000,
  }}
  dataPoints={[]}
  categories={[]}
  unit="requests"
  onDateRangeChange={(start, end) => {
    /* change date range */
  }}
/>`,
  },
  "settings-account": {
    usageImports: `import SettingsAccount from "@/registry/new-york/blocks/settings/settings-account";`,
    usageCode: `<SettingsAccount
  account={{
    type: "pro",
    status: "active",
    memberCount: 8,
    memberLimit: 10,
    storageUsed: 15 * 1024 * 1024 * 1024,
    storageLimit: 100 * 1024 * 1024 * 1024,
  }}
  onUpgrade={async () => {
    /* upgrade account */
  }}
  onDelete={async () => {
    /* delete account */
  }}
  onTransfer={async () => {
    /* transfer account */
  }}
/>`,
  },
  "settings-activity-log": {
    usageImports: `import SettingsActivityLog from "@/registry/new-york/blocks/settings/settings-activity-log";`,
    usageCode: `<SettingsActivityLog
  entries={[
    {
      id: "log-1",
      action: "login",
      type: "login",
      description: "User logged in",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      timestamp: new Date(),
      status: "success",
    },
  ]}
  onExport={async (filters) => {
    /* export activity log */
  }}
/>`,
  },
  "settings-advanced": {
    usageImports: `import SettingsAdvanced from "@/registry/new-york/blocks/settings/settings-advanced";`,
    usageCode: `<SettingsAdvanced
  featureFlags={[
    { id: "ff-1", name: "Experimental UI", enabled: true },
    { id: "ff-2", name: "Debug Logging", enabled: false },
  ]}
  onToggleFlag={(flagId, enabled) => {
    /* enable flag */
  }}
/>`,
  },
  "settings-api-keys": {
    usageImports: `import SettingsAPIKeys from "@/registry/new-york/blocks/settings/settings-api-keys";`,
    usageCode: `<SettingsAPIKeys
  apiKeys={[
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk_live_1234567890abcdef",
      createdAt: new Date(),
      lastUsed: new Date(),
      scopes: ["read", "write"],
      usageCount: 15_420,
    },
  ]}
  onCreate={async (data) => {
    /* create new key */
  }}
  onRevoke={async (keyId) => {
    /* revoke key */
  }}
/>`,
  },
  "settings-export-data": {
    usageImports: `import SettingsExportData from "@/registry/new-york/blocks/settings/settings-export-data";`,
    usageCode: `<SettingsExportData
  exportHistory={[
    {
      id: "export-1",
      format: "json",
      scope: ["profile", "activity"],
      status: "completed",
      createdAt: new Date(),
      completedAt: new Date(),
      downloadUrl: "#",
      expiresAt: new Date(),
    },
  ]}
  onExport={async (data) => {
    /* start export */
  }}
  onDownload={async (jobId) => {
    /* download export */
  }}
/>`,
  },
  "settings-backup": {
    usageImports: `import SettingsBackup from "@/registry/new-york/blocks/settings/settings-backup";`,
    usageCode: `<SettingsBackup
  backups={[
    {
      id: "backup-1",
      name: "Automatic Backup - Daily",
      type: "automatic",
      status: "completed",
      size: 500 * 1024 * 1024,
      createdAt: new Date(),
      completedAt: new Date(),
      location: "cloud",
      retentionDays: 30,
    },
  ]}
  autoBackupEnabled={true}
  autoBackupSchedule="daily"
  retentionDays={30}
  onCreateBackup={async () => {
    /* create backup */
  }}
  onRestore={async (backupId) => {
    /* restore backup */
  }}
/>`,
  },
  "settings-domains": {
    usageImports: `import SettingsDomains from "@/registry/new-york/blocks/settings/settings-domains";`,
    usageCode: `<SettingsDomains
  domains={[
    {
      id: "domain-1",
      domain: "example.com",
      status: "verified",
      sslEnabled: true,
      verifiedAt: new Date(),
    },
  ]}
  onCreate={async (domain) => {
    /* create domain */
  }}
  onDelete={async (id) => {
    /* delete domain */
  }}
  onVerify={async (id) => {
    /* verify domain */
  }}
/>`,
  },
  "settings-import-data": {
    usageImports: `import SettingsImportData from "@/registry/new-york/blocks/settings/settings-import-data";`,
    usageCode: `<SettingsImportData
  importHistory={[
    {
      id: "import-1",
      filename: "user-data-backup.json",
      format: "json",
      status: "completed",
      createdAt: new Date(),
      completedAt: new Date(),
      recordsImported: 1250,
      recordsSkipped: 12,
      recordsFailed: 3,
      conflictResolution: "merge",
    },
  ]}
  onUpload={async (file) => {
    /* upload and preview file */
  }}
  onImport={async (data) => {
    /* import data */
  }}
/>`,
  },
  "settings-integrations": {
    usageImports: `import SettingsIntegrations from "@/registry/new-york/blocks/settings/settings-integrations";`,
    usageCode: `<SettingsIntegrations
  integrations={[
    {
      id: "github",
      name: "GitHub",
      description: "Connect your GitHub account to sync repositories",
      status: "connected",
      lastSynced: new Date(),
      scopes: ["repo", "read:user"],
    },
  ]}
  onConnect={async (integrationId) => {
    /* connect integration */
  }}
  onDisconnect={async (integrationId) => {
    /* disconnect integration */
  }}
/>`,
  },
  "settings-notifications": {
    usageImports: `import SettingsNotifications from "@/registry/new-york/blocks/settings/settings-notifications";`,
    usageCode: `<SettingsNotifications
  preferences={{
    categories: [
      {
        id: "mentions",
        name: "Mentions",
        description: "When someone mentions you",
        channels: { email: true, push: true, inApp: true, sms: false },
        frequency: "realtime",
      },
    ],
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  }}
  onSave={async (data) => {
    /* save notification preferences */
  }}
/>`,
  },
  "settings-preferences": {
    usageImports: `import SettingsPreferences from "@/registry/new-york/blocks/settings/settings-preferences";`,
    usageCode: `<SettingsPreferences
  preferences={{
    theme: "dark",
    language: "en",
    timezone: "America/Los_Angeles",
    codeFontSize: 16,
  }}
  onSave={async (prefs) => {
    /* save preferences */
  }}
/>`,
  },
  "settings-privacy": {
    usageImports: `import SettingsPrivacy from "@/registry/new-york/blocks/settings/settings-privacy";`,
    usageCode: `<SettingsPrivacy
  privacySettings={{
    profileVisibility: "private",
    dataSharing: false,
    require2FA: true,
  }}
  onSave={async (settings) => {
    /* save privacy */
  }}
/>`,
  },
  "settings-profile": {
    usageImports: `import SettingsProfile from "@/registry/new-york/blocks/settings/settings-profile";`,
    usageCode: `<SettingsProfile
  profile={{
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Design Engineer. Open Source Advocate. Loves UI/UX.",
    location: "San Francisco, CA",
    website: "https://example.com",
    avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=john-doe",
    social: { twitter: "johndoe", github: "johnnydoe" },
  }}
  onSave={async (data) => {
    /* save profile */
  }}
/>`,
  },
  "settings-security": {
    usageImports: `import SettingsSecurity from "@/registry/new-york/blocks/settings/settings-security";`,
    usageCode: `<SettingsSecurity
  sessions={[
    {
      id: "sec-session-1",
      ip: "192.168.1.1",
      device: "MacBook Pro",
      browser: "Chrome",
      active: true,
      lastActive: new Date(),
    },
  ]}
  events={[]}
  onRevokeSession={(id) => {
    /* revoke session */
  }}
  onRevokeAllSessions={() => {
    /* revoke all */
  }}
/>`,
  },
  "settings-sso": {
    usageImports: `import SettingsSSO from "@/registry/new-york/blocks/settings/settings-sso";`,
    usageCode: `<SettingsSSO
  enabled={true}
  providers={[
    {
      id: "sso-1",
      name: "Okta",
      type: "saml",
      enabled: true,
      status: "active",
      metadataUrl: "https://example.okta.com/saml/metadata",
      entityId: "https://example.okta.com/app/example",
      ssoUrl: "https://example.okta.com/app/example/sso/saml",
      lastTested: new Date(),
      userCount: 45,
    },
  ]}
  onCreate={async (data) => {
    /* create SSO provider */
  }}
  onUpdate={async (id, data) => {
    /* update SSO provider */
  }}
  onTest={async (id) => {
    /* test SSO connection */
  }}
/>`,
  },
  "settings-storage": {
    usageImports: `import SettingsStorage from "@/registry/new-york/blocks/settings/settings-storage";`,
    usageCode: `<SettingsStorage
  totalUsed={7 * 1024 * 1024 * 1024}
  totalLimit={100 * 1024 * 1024 * 1024}
  categories={[
    {
      id: "files",
      name: "Files",
      icon: FileText,
      used: 5 * 1024 * 1024 * 1024,
      total: 10 * 1024 * 1024 * 1024,
      color: "bg-blue-500/10",
    },
  ]}
  onCleanup={async (categoryId) => {
    /* start cleanup */
  }}
/>`,
  },
  "settings-team-members": {
    usageImports: `import SettingsTeamMembers from "@/registry/new-york/blocks/settings/settings-team-members";`,
    usageCode: `<SettingsTeamMembers
  members={[
    {
      id: "user-1",
      name: "Alice Admin",
      email: "alice@company.com",
      role: "admin",
    },
  ]}
  onInvite={async (email, role) => {
    /* invite member */
  }}
  onRemove={async (id) => {
    /* remove member */
  }}
  onUpdateRole={async (id, newRole) => {
    /* update role */
  }}
/>`,
  },
  "settings-webhooks": {
    usageImports: `import SettingsWebhooks from "@/registry/new-york/blocks/settings/settings-webhooks";`,
    usageCode: `<SettingsWebhooks
  webhooks={[
    {
      id: "webhook-1",
      name: "Payment Notifications",
      url: "https://api.example.com/webhooks/payment",
      secret: "whsec_1234567890abcdef",
      events: ["payment.succeeded", "payment.failed"],
      status: "active",
      createdAt: new Date(),
      lastTriggered: new Date(),
      successCount: 245,
      failureCount: 3,
    },
  ]}
  deliveries={{}}
  onCreate={async (data) => {
    /* create webhook */
  }}
  onUpdate={async (id, data) => {
    /* update webhook */
  }}
  onDelete={async (id) => {
    /* delete webhook */
  }}
/>`,
  },
  "team-activity-feed": {
    usageImports: `import TeamActivityFeed from "@/registry/new-york/blocks/team/team-activity-feed";`,
    usageCode: `<TeamActivityFeed
  activities={[
    {
      id: "activity-1",
      type: "member_joined",
      user: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      description: "joined the team",
      timestamp: new Date(),
    },
  ]}
  onFilterChange={(filters) => {
    /* filter activities */
  }}
  showFilters={true}
/>`,
  },
  "team-ai-room": {
    usageImports: `import TeamAIRoom from "@/registry/new-york/blocks/team/team-ai-room";`,
    usageCode: `<TeamAIRoom
  roomName="Shared AI Workspace"
  participants={[
    {
      id: "user-1",
      name: "Alice",
      avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
    },
  ]}
  messages={[
    {
      id: "ai-msg-1",
      role: "user",
      content: "What are the best practices for React components?",
      author: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      timestamp: new Date(),
    },
  ]}
  currentUserId="user-1"
  onSendMessage={async (content) => {
    /* send message */
  }}
/>`,
  },
  "team-analytics": {
    usageImports: `import TeamAnalytics from "@/registry/new-york/blocks/team/team-analytics";`,
    usageCode: `<TeamAnalytics
  tokenUsage={{
    current: 250000,
    previous: 200000,
  }}
  sessionCount={{
    current: 145,
    previous: 120,
  }}
  memberUsage={[
    {
      id: "user-1",
      name: "Alice",
      avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      tokens: 125000,
      sessions: 45,
      files: 12,
    },
  ]}
  topProjects={[
    {
      id: "project-1",
      name: "Website Redesign",
      usage: 250000,
    },
  ]}
/>`,
  },
  "team-chat": {
    usageImports: `import TeamChat from "@/registry/new-york/blocks/team/team-chat";`,
    usageCode: `<TeamChat
  messages={[
    {
      id: "msg-1",
      content: "Hey team! Let's discuss the new feature",
      author: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      timestamp: new Date(),
    },
  ]}
  currentUserId="user-1"
  onSendMessage={async (content) => {
    /* send message */
  }}
/>`,
  },
  "team-dashboard": {
    usageImports: `import TeamDashboard from "@/registry/new-york/blocks/team/team-dashboard";`,
    usageCode: `<TeamDashboard
  teamName="Acme Inc."
  plan="pro"
  members={[
    {
      id: "user-1",
      name: "Alice",
      avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      role: "admin",
      status: "active",
    },
  ]}
  recentActivities={[
    {
      id: "activity-1",
      type: "member_joined",
      user: { name: "Alice", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice" },
      description: "Alice joined the team",
      timestamp: new Date(),
    },
  ]}
  usage={{
    aiTokens: { used: 250000, limit: 1000000 },
    storage: { used: 15 * 1024 * 1024 * 1024, limit: 100 * 1024 * 1024 * 1024 },
    members: { current: 12, limit: 50 },
  }}
  onInviteMember={() => {
    /* invite member */
  }}
  onManageSettings={() => {
    /* manage settings */
  }}
/>`,
  },
  "team-files": {
    usageImports: `import TeamFiles from "@/registry/new-york/blocks/team/team-files";`,
    usageCode: `<TeamFiles
  files={[
    {
      id: "file-1",
      name: "project-plan.pdf",
      type: "application/pdf",
      size: 2.5 * 1024 * 1024,
      uploadedBy: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      uploadedAt: new Date(),
      tags: ["planning", "project"],
      aiAccessible: true,
    },
  ]}
  onUpload={async (files) => {
    /* upload files */
  }}
  onDelete={async (fileId) => {
    /* delete file */
  }}
  onDownload={async (fileId) => {
    /* download file */
  }}
  onToggleAIAccess={async (fileId, enabled) => {
    /* toggle AI access */
  }}
/>`,
  },
  "team-invitations": {
    usageImports: `import TeamInvitations from "@/registry/new-york/blocks/team/team-invitations";`,
    usageCode: `<TeamInvitations
  invitations={[
    {
      id: "inv-1",
      email: "new@example.com",
      role: "member",
      status: "pending",
      invitedBy: { name: "Alice", email: "alice@example.com" },
      createdAt: new Date(),
      expiresAt: new Date(),
    },
  ]}
  onCreate={async (data) => {
    /* create invitation */
    return {
      id: "inv-new",
      email: data.email,
      role: data.role,
      status: "pending",
      invitedBy: { name: "Alice", email: "alice@example.com" },
      createdAt: new Date(),
      expiresAt: data.expiresInDays ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000) : undefined,
    };
  }}
  onRevoke={async (invitationId) => {
    /* revoke invitation */
  }}
  onResend={async (invitationId) => {
    /* resend invitation */
  }}
  onCopyLink={async (link) => {
    /* copy invitation link */
  }}
/>`,
  },
  "team-member-list": {
    usageImports: `import TeamMemberList from "@/registry/new-york/blocks/team/team-member-list";`,
    usageCode: `<TeamMemberList
  members={[
    {
      id: "member-1",
      name: "Alice Admin",
      email: "alice@company.com",
      avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      role: "admin",
      status: "active",
      joinedAt: new Date(),
      aiUsage: {
        tokens: 125000,
        sessions: 45,
      },
    },
  ]}
  currentUserId="member-1"
  onPromote={async (memberId) => {
    /* promote member */
  }}
  onDemote={async (memberId) => {
    /* demote member */
  }}
  onRemove={async (memberId) => {
    /* remove member */
  }}
  onResendInvite={async (memberId) => {
    /* resend invite */
  }}
  showUsage={true}
/>`,
  },
  "team-notes": {
    usageImports: `import TeamNotes from "@/registry/new-york/blocks/team/team-notes";`,
    usageCode: `<TeamNotes
  notes={[
    {
      id: "note-1",
      title: "Sprint Planning Notes",
      content: "Key decisions from today's sprint planning meeting...",
      author: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      tags: ["sprint", "planning"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]}
  currentUserId="user-1"
  onCreate={async (data) => {
    /* create note */
    return {
      id: "note-new",
      title: data.title,
      content: data.content,
      author: { id: "user-1", name: "Alice" },
      tags: data.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }}
  onUpdate={async (noteId, data) => {
    /* update note */
  }}
  onDelete={async (noteId) => {
    /* delete note */
  }}
  onSummarize={async (noteId) => {
    /* generate AI summary */
    return "AI-generated summary of the note content.";
  }}
/>`,
  },
  "team-notifications": {
    usageImports: `import TeamNotifications from "@/registry/new-york/blocks/team/team-notifications";`,
    usageCode: `<TeamNotifications
  notifications={[
    {
      id: "notif-1",
      type: "mention",
      title: "You were mentioned",
      message: "Mike Chen mentioned you in a chat message",
      user: {
        id: "user-2",
        name: "Mike Chen",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
      },
      read: false,
      timestamp: new Date(),
      link: "#chat",
    },
  ]}
  unreadCount={3}
  onMarkAsRead={async (notificationId) => {
    /* mark as read */
  }}
  onMarkAllAsRead={async () => {
    /* mark all as read */
  }}
  onDelete={async (notificationId) => {
    /* delete notification */
  }}
/>`,
  },
  "team-permissions-matrix": {
    usageImports: `import TeamPermissionsMatrix from "@/registry/new-york/blocks/team/team-permissions-matrix";`,
    usageCode: "<TeamPermissionsMatrix />",
  },
  "team-projects": {
    usageImports: `import TeamProjects from "@/registry/new-york/blocks/team/team-projects";`,
    usageCode: `<TeamProjects
  projects={[
    {
      id: "project-1",
      name: "Website Redesign",
      description: "Complete redesign of company website",
      color: "#3b82f6",
      members: [
        { id: "user-1", name: "Alice", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice" },
      ],
      defaultModel: "gpt-4",
      aiUsage: {
        tokens: 250000,
        sessions: 89,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]}
  currentUserId="user-1"
  onCreate={async (data) => {
    /* create project */
    return {
      id: "project-new",
      name: data.name,
      description: data.description,
      color: data.color || "#3b82f6",
      members: [],
      defaultModel: data.defaultModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }}
  onUpdate={async (projectId, data) => {
    /* update project */
  }}
  onDelete={async (projectId) => {
    /* delete project */
  }}
  onSelect={(projectId) => {
    /* select project */
  }}
/>`,
  },
  "team-prompt-library": {
    usageImports: `import TeamPromptLibrary from "@/registry/new-york/blocks/team/team-prompt-library";`,
    usageCode: `<TeamPromptLibrary
  prompts={[
    {
      id: "prompt-1",
      title: "Code Review Assistant",
      prompt: "Review this code and provide suggestions for improvement...",
      description: "Helps with code reviews and improvements",
      category: "Code",
      author: {
        id: "user-1",
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
      },
      usageCount: 45,
      bestModel: "gpt-4",
      tags: ["code", "review", "best-practices"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]}
  currentUserId="user-1"
  onCreate={async (data) => {
    /* create prompt */
    return {
      id: "prompt-new",
      title: data.title,
      prompt: data.prompt,
      description: data.description,
      category: data.category,
      tags: data.tags,
      author: { id: "user-1", name: "Alice" },
      bestModel: data.bestModel,
      tone: data.tone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }}
  onUpdate={async (promptId, data) => {
    /* update prompt */
  }}
  onDelete={async (promptId) => {
    /* delete prompt */
  }}
  onFavorite={async (promptId, isFavorite) => {
    /* toggle favorite */
  }}
  onUse={(prompt) => {
    /* use prompt */
  }}
/>`,
  },
  "team-settings": {
    usageImports: `import TeamSettings from "@/registry/new-york/blocks/team/team-settings";`,
    usageCode: `<TeamSettings
  plan="pro"
  settings={{
    name: "Acme Inc.",
    description: "A modern software company",
    slug: "acme-inc",
    color: "#3b82f6",
    defaultModel: "gpt-4",
  }}
  onSave={async (settings) => {
    /* save team settings */
  }}
  onAvatarUpload={async (file) => {
    /* upload avatar */
    return "https://api.dicebear.com/9.x/glass/svg?seed=team-avatar";
  }}
  onAvatarRemove={async () => {
    /* remove avatar */
  }}
/>`,
  },
  "team-switcher": {
    usageImports: `import TeamSwitcher from "@/registry/new-york/blocks/team/team-switcher";`,
    usageCode: `<TeamSwitcher
  teams={[
    {
      id: "team-1",
      name: "Design Team",
      avatar: "https://api.dicebear.com/9.x/glass/svg?seed=team-avatar",
      plan: "pro",
      memberCount: 8,
    },
  ]}
  currentTeamId="team-1"
  onTeamSelect={(teamId) => {
    /* select team */
  }}
  onCreateTeam={() => {
    /* create new team */
  }}
  showPlan={true}
/>`,
  },
  "task-board": {
    usageImports: `import TaskBoard from "@/registry/new-york/blocks/tasks/task-board";`,
    usageCode: `<TaskBoard
  tasks={[
    {
      id: "task-1",
      title: "Redesign homepage hero section",
      description: "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards.",
      status: "in_progress",
      priority: "high",
      assignees: [
        {
          id: "user-1",
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
        },
        {
          id: "user-2",
          name: "Marcus Rodriguez",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
        },
      ],
      tags: ["design", "frontend", "ui"],
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-2",
      title: "Implement OAuth 2.0 authentication flow",
      description: "Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage. Include rate limiting and CSRF protection.",
      status: "todo",
      priority: "urgent",
      assignees: [
        {
          id: "user-3",
          name: "Emily Watson",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
        },
      ],
      tags: ["backend", "security", "auth"],
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
  ]}
  onTaskSelect={(taskId) => {
    // Open task detail view or navigate to task page
    setSelectedTaskId(taskId);
    router.push(\`/tasks/\${taskId}\`);
  }}
  onTaskMove={async (taskId, fromStatus, toStatus) => {
    // Update task status in your database/state
    await updateTaskStatus(taskId, toStatus);
    // Optional: Send notification to assignees
    await notifyTaskStatusChange(taskId, toStatus);
  }}
  onTaskUpdate={async (taskId, updates) => {
    // Update task fields (priority, assignees, due date, etc.)
    await updateTask(taskId, updates);
  }}
  onTaskDelete={async (taskId) => {
    // Confirm deletion, then remove from database
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  }}
/>`,
  },
  "task-create": {
    usageImports: `import TaskCreate from "@/registry/new-york/blocks/tasks/task-create";`,
    usageCode: `<TaskCreate
  availableAssignees={[
    { id: "user-1", name: "Sarah Chen" },
    { id: "user-2", name: "Marcus Rodriguez" },
    { id: "user-3", name: "Emily Watson" },
    { id: "user-4", name: "David Kim" },
  ]}
  availableProjects={[
    { id: "project-1", name: "Q4 Website Redesign" },
    { id: "project-2", name: "Mobile App v2.0" },
    { id: "project-3", name: "Payment System Integration" },
  ]}
  onCreate={async (data) => {
    // Create task in your database
    const newTask = await createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assigneeIds: data.assigneeIds,
      projectId: data.projectId,
      dueDate: data.dueDate,
      tags: data.tags,
    });
    
    // Return the created task with generated ID
    return {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      assignees: newTask.assignees,
      tags: newTask.tags,
      dueDate: newTask.dueDate,
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  }}
  onCancel={() => {
    // Close modal or navigate back
    setIsCreateModalOpen(false);
    router.back();
  }}
/>`,
  },
  "task-detail": {
    usageImports: `import TaskDetail from "@/registry/new-york/blocks/tasks/task-detail";`,
    usageCode: `<TaskDetail
  task={{
    id: "task-1",
    title: "Redesign homepage hero section",
    description: "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards. Include A/B testing setup for conversion optimization.",
    status: "in_progress",
    priority: "high",
    assignees: [
      {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
      },
      {
        id: "user-2",
        name: "Marcus Rodriguez",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
      },
    ],
    tags: ["design", "frontend", "ui"],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  }}
  subtasks={[
    { id: "subtask-1", title: "Create low-fidelity wireframes for desktop and mobile", completed: true },
    { id: "subtask-2", title: "Design high-fidelity mockups in Figma", completed: true },
    { id: "subtask-3", title: "Get stakeholder approval on design direction", completed: true },
    { id: "subtask-4", title: "Implement responsive HTML/CSS structure", completed: false },
    { id: "subtask-5", title: "Add animations and micro-interactions", completed: false },
    { id: "subtask-6", title: "Conduct accessibility audit and fix issues", completed: false },
  ]}
  comments={[
    {
      id: "comment-1",
      content: "I've reviewed the design mockups and they look good! One suggestion: we should increase the CTA button size on mobile by 10% for better touch targets. Also, can we add a subtle animation on hover?",
      author: {
        id: "user-2",
        name: "Marcus Rodriguez",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "comment-2",
      content: "Thanks for the feedback! I've updated the mobile CTA size and added a smooth scale animation. The changes are in the latest commit. Can you take another look?",
      author: {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]}
  attachments={[
    {
      id: "attachment-1",
      name: "hero-section-mockup-v3.fig",
      url: "https://example.com/files/hero-section-mockup-v3.fig",
      size: 3_456_000,
      type: "application/octet-stream",
      uploadedBy: {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
      },
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "attachment-2",
      name: "brand-guidelines-2025.pdf",
      url: "https://example.com/files/brand-guidelines-2025.pdf",
      size: 2_147_000,
      type: "application/pdf",
      uploadedBy: {
        id: "user-2",
        name: "Marcus Rodriguez",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
      },
      uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  ]}
  activities={[
    {
      id: "activity-1",
      type: "created",
      user: {
        id: "user-2",
        name: "Marcus Rodriguez",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
      },
      description: "created this task",
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    },
    {
      id: "activity-2",
      type: "assigned",
      user: {
        id: "user-2",
        name: "Marcus Rodriguez",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
      },
      description: "assigned to Sarah Chen and Marcus Rodriguez",
      timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    },
    {
      id: "activity-3",
      type: "updated",
      user: {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
      },
      description: "updated the priority to High",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ]}
  onUpdate={async (updates) => {
    // Update task in your database
    await updateTask(task.id, updates);
    // Refresh task data
    await refetchTask(task.id);
  }}
  onDelete={async () => {
    // Confirm deletion
    if (confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      await deleteTask(task.id);
      // Navigate back or close detail view
      router.push("/tasks");
    }
  }}
/>`,
  },
  "task-filters": {
    usageImports: `import TaskFilters from "@/registry/new-york/blocks/tasks/task-filters";`,
    usageCode: `<TaskFilters
  availableAssignees={[
    { id: "user-1", name: "Sarah Chen" },
    { id: "user-2", name: "Marcus Rodriguez" },
    { id: "user-3", name: "Emily Watson" },
    { id: "user-4", name: "David Kim" },
    { id: "user-5", name: "Priya Patel" },
  ]}
  availableProjects={[
    { id: "project-1", name: "Q4 Website Redesign" },
    { id: "project-2", name: "Mobile App v2.0" },
    { id: "project-3", name: "Payment System Integration" },
    { id: "project-4", name: "Performance Optimization" },
  ]}
  availableTags={[
    "design",
    "frontend",
    "backend",
    "security",
    "documentation",
    "mobile",
    "devops",
    "review",
    "ui",
    "auth",
    "api",
    "bug",
    "ci-cd",
    "performance",
    "database",
    "email",
    "payments",
  ]}
  onFiltersChange={(filters) => {
    // Update URL query params for shareable filters
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.assigneeIds?.length) params.set("assignees", filters.assigneeIds.join(","));
    if (filters.projectId) params.set("project", filters.projectId);
    if (filters.tags?.length) params.set("tags", filters.tags.join(","));
    
    router.push(\`/tasks?\${params.toString()}\`);
    
    // Or update local state and refetch tasks
    setFilters(filters);
    refetchTasks(filters);
  }}
/>`,
  },
  "task-list": {
    usageImports: `import TaskList from "@/registry/new-york/blocks/tasks/task-list";`,
    usageCode: `<TaskList
  tasks={[
    {
      id: "task-1",
      title: "Redesign homepage hero section",
      description: "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy.",
      status: "in_progress",
      priority: "high",
      assignees: [
        {
          id: "user-1",
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
        },
        {
          id: "user-2",
          name: "Marcus Rodriguez",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
        },
      ],
      tags: ["design", "frontend", "ui"],
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-2",
      title: "Implement OAuth 2.0 authentication flow",
      description: "Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage.",
      status: "todo",
      priority: "urgent",
      assignees: [
        {
          id: "user-3",
          name: "Emily Watson",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
        },
      ],
      tags: ["backend", "security", "auth"],
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-3",
      title: "Complete API documentation for v2.0",
      description: "Document all REST endpoints with request/response examples, error codes, rate limits, and authentication requirements.",
      status: "done",
      priority: "medium",
      assignees: [
        {
          id: "user-4",
          name: "David Kim",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
        },
      ],
      tags: ["documentation", "api"],
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]}
  onTaskSelect={(taskId) => {
    // Open task detail view
    setSelectedTaskId(taskId);
    setIsDetailOpen(true);
    // Or navigate to task page
    router.push(\`/tasks/\${taskId}\`);
  }}
  onTaskUpdate={async (taskId, updates) => {
    // Update task in database
    try {
      await updateTask(taskId, updates);
      // Show success notification
      toast.success("Task updated successfully");
      // Refresh task list
      await refetchTasks();
    } catch (error) {
      // Handle error
      toast.error("Failed to update task");
      console.error(error);
    }
  }}
  onTaskDelete={async (taskId) => {
    // Confirm deletion
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted");
        await refetchTasks();
      } catch (error) {
        toast.error("Failed to delete task");
        console.error(error);
      }
    }
  }}
/>`,
  },
  "task-progress": {
    usageImports: `import TaskProgress from "@/registry/new-york/blocks/tasks/task-progress";`,
    usageCode: `<TaskProgress
  goal={12}
  tasks={[
    {
      id: "task-1",
      title: "Redesign homepage hero section",
      status: "done",
      priority: "high",
      assignees: [],
      tags: [],
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-2",
      title: "Implement OAuth 2.0 authentication",
      status: "done",
      priority: "urgent",
      assignees: [],
      tags: [],
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-3",
      title: "Complete API documentation",
      status: "done",
      priority: "medium",
      assignees: [],
      tags: [],
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "task-4",
      title: "Fix iOS Safari layout bugs",
      status: "in_progress",
      priority: "high",
      assignees: [],
      tags: [],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]}
/>`,
  },
  "project-list": {
    usageImports: `import ProjectList from "@/registry/new-york/blocks/tasks/project-list";`,
    usageCode: `<ProjectList
  projects={[
    {
      id: "project-1",
      name: "Q4 Website Redesign",
      description: "Complete redesign of company website with focus on conversion optimization, improved accessibility, and modern design patterns. Includes new CMS integration and performance improvements.",
      status: "active",
      progress: 68,
      color: "#3b82f6",
      members: [
        {
          id: "user-1",
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
        },
        {
          id: "user-2",
          name: "Marcus Rodriguez",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
        },
        {
          id: "user-5",
          name: "Priya Patel",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
        },
      ],
      taskCount: 24,
      completedTaskCount: 16,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "project-2",
      name: "Mobile App v2.0",
      description: "Major update to mobile application with new features: offline mode, push notifications, and improved performance. Targeting iOS 15+ and Android 12+.",
      status: "active",
      progress: 42,
      color: "#10b981",
      members: [
        {
          id: "user-1",
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
        },
        {
          id: "user-3",
          name: "Emily Watson",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
        },
        {
          id: "user-5",
          name: "Priya Patel",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
        },
      ],
      taskCount: 18,
      completedTaskCount: 8,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "project-3",
      name: "Payment System Integration",
      description: "Integrate Stripe and PayPal payment gateways with subscription management, invoicing, and refund handling. Includes PCI compliance audit.",
      status: "completed",
      progress: 100,
      color: "#8b5cf6",
      members: [
        {
          id: "user-2",
          name: "Marcus Rodriguez",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
        },
        {
          id: "user-3",
          name: "Emily Watson",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
        },
        {
          id: "user-4",
          name: "David Kim",
          avatar: "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
        },
      ],
      taskCount: 14,
      completedTaskCount: 14,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]}
  onProjectSelect={(projectId) => {
    // Navigate to project detail page
    router.push(\`/projects/\${projectId}\`);
    // Or filter tasks by project
    setSelectedProjectId(projectId);
    refetchTasks({ projectId });
  }}
/>`,
  },
} as const;

export type BlockSnippets = typeof blockSnippets;
