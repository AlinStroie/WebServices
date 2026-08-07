let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0);
  }
  const filePath = (data.tool_input && data.tool_input.file_path) || '';
  const base = filePath.replace(/\\/g, '/').split('/').pop() || '';
  const isEnvFile = base === '.env' || (base.startsWith('.env.') && base !== '.env.example');
  if (isEnvFile) {
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: `Blocked: ${base} holds live secrets (SMTP creds, JWT secrets, DB URL). Edit it by hand, not through Claude.`,
        },
      })
    );
  }
});
