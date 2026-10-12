const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/wishlist') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405);
    if (request.headers.get('Origin') !== url.origin) return json({ error: 'Origem não permitida.' }, 403);
    if (!request.headers.get('Content-Type')?.includes('application/json')) return json({ error: 'Formato inválido.' }, 415);

    let data;
    try {
      // Bound the body even when Content-Length is absent or inaccurate.
      const reader = request.body?.getReader();
      if (!reader) return json({ error: 'Preencha nome e e-mail.' }, 400);
      const chunks = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 4096) { await reader.cancel(); return json({ error: 'Dados muito extensos.' }, 413); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      data = JSON.parse(new TextDecoder().decode(bytes));
    } catch { return json({ error: 'Dados inválidos.' }, 400); }
    if (!data || typeof data !== 'object') return json({ error: 'Dados inválidos.' }, 400);
    if (data.website) return json({ error: 'Cadastro inválido.' }, 400);
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    if (!name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.consent !== true) {
      return json({ error: 'Informe nome, e-mail válido e autorize o contato.' }, 400);
    }
    try {
      await env.EMAIL.send({
        to: env.CONTACT_RECIPIENTS.split(',').map(value => value.trim()).filter(Boolean),
        from: { email: 'site@procics.com.br', name: 'Os Elementos | Procics' },
        replyTo: email,
        subject: 'Nova inscrição na lista de espera — Os Elementos',
        text: `Nome: ${name}\nE-mail: ${email}\n\nSolicitou entrar na lista de espera de Os Elementos e autorizou contato sobre o jogo.`,
        html: `<h2>Lista de espera — Os Elementos</h2><p><strong>Nome:</strong> ${escapeHtml(name)}</p><p><strong>E-mail:</strong> ${escapeHtml(email)}</p><p>Solicitou entrar na lista de espera e autorizou contato sobre o jogo.</p>`
      });
      return json({ success: true });
    } catch {
      console.error('wishlist_email_failed');
      return json({ error: 'Não foi possível enviar sua inscrição. Tente novamente.' }, 502);
    }
  }
};

