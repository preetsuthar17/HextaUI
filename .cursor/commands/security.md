Check your codebase for common security issues and vulnerabilities.


1. Run the security scanner:  
   Execute `npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0 --config .eslintrc.security.json` to scan for insecure code patterns.

2. Review results:  
   Carefully review any warnings or errors. Pay close attention to dangerous patterns, dependency or API misuse, or missing security best practices.

3. Fix vulnerabilities:  
   Address each issue using secure coding practices (validate inputs, escape output, use HTTPS APIs, avoid dangerous functions, etc).

4. Re-run the scan:  
   After making changes, rerun the command above to confirm all security concerns are resolved.

Repeat steps 3 and 4 until the scanner reports a clean bill of health.

Consider running `npm audit` or `bun audit` as well to check dependencies for known vulnerabilities.
