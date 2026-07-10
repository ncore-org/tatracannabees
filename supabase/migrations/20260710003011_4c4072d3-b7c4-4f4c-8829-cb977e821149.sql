DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can submit a contact message"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 80
    AND char_length(email) BETWEEN 3 AND 160
    AND email LIKE '%_@_%._%'
    AND topic IN ('wholesale','general')
    AND char_length(message) BETWEEN 10 AND 2000
  );