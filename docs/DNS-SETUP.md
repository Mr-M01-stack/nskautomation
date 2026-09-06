# Point nskautomation.co.in at GitHub Pages

These steps are done in the **client's GoDaddy account** (the person who owns the domain).
One-time setup, about 10–15 minutes. The website then runs from GitHub Pages for free.

> **IMPORTANT — do not touch email records.** If you see MX, TXT (SPF/DKIM) or other
> records in the DNS table, **leave them exactly as they are**. We are only changing the
> website records (type **A** and type **CNAME**). Email is separate and keeps working.

---

## Steps

1. Log in at **godaddy.com** with the account that owns `nskautomation.co.in`.
2. Go to **My Products** → next to the domain click **...** (or "Manage") → **Manage DNS**.
   - (Alternative path: top menu **Domains** → click the domain name → **DNS**.)
3. On the **DNS Records / Records** page you'll see a table.
4. **Find any record with Type `A` and Host `@`** whose value is a GoDaddy parking page
   IP (something like `97.74.x.x` / `184.168.x.x`). These were auto-created when the domain
   was bought. **Delete those `A` records only** — nothing else.
5. **Add 4 new A records** — one row each, using the **Add Record** button:

   | Type | Name/Host | Value | TTL |
   |------|-----------|-------|-----|
   | A    | `@`       | `185.199.108.153` | 1 hour |
   | A    | `@`       | `185.199.109.153` | 1 hour |
   | A    | `@`       | `185.199.110.153` | 1 hour |
   | A    | `@`       | `185.199.111.153` | 1 hour |

6. **Add 1 CNAME record:**

   | Type   | Name/Host | Value                       | TTL |
   |--------|-----------|-----------------------------|-----|
   | CNAME  | `www`     | `Mr-M01-stack.github.io`    | 1 hour |

7. **Remove the old parking record** (if any) for `www` pointing at
   `@` (a CNAME `www` → `nskautomation.co.in`). Its value will look like the domain
   itself. **Do not** remove anything that looks like email or `verify` records.
8. Click **Save / Save Changes**.

---

## After saving

- Changes usually spread in **15 minutes to a few hours** (rarely up to 24–48 h).
- Website will then be live at **https://www.nskautomation.co.in** (HTTPS comes free
  and automatically).
- Visiting the bare domain **nskautomation.co.in** automatically forwards to `www`.
- Nothing else is needed on the GitHub side — the repo is already configured.

## What this does NOT affect

- **Email:** if the client's `@nskautomation.co.in` mail is with GoDaddy, it keeps
  working. If email hasn't been activated yet, activate it in GoDaddy's **Email / My
  Email** area — GoDaddy adds the needed MX/TXT records itself.
- **Domain renewal / protection:** unaffected — still managed in GoDaddy under the
  client's account.