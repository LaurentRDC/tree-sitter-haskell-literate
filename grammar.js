module.exports = grammar({
	name: "haskell_literate",

	extras: ($) => [],

	rules: {
		source_file: ($) =>
			seq(
				repeat(
					choice(
						$.bird_line,
						$.latex_code_block,
						$.markdown_code_block,
						$.blank_line,
						$.prose_line,
					),
				),
			),

		// Bird-style line
		// Note that while Bird-style *technically* requires blank lines
		// before and after the '>' lines, this behavior can be turned
		// off such that GHC will parse a document like:
		//
		// This is a sentence.
		// > foo = undefined
		// This is another sentence.
		//
		// Therefore, we do not enforce that a Bird-style code block
		// is surrounded by blank lines.

		bird_line: ($) =>
			seq(
				// < is used to highlight a line, but make the line ignored
				// by the compiler. It's rather rare.
				choice('>', '<'),
				optional(" "), // Optional sinle space after >
				optional($.haskell_code),
				$._newline,
			),

		// LaTeX-style code blocks
		latex_code_block: ($) =>
			seq(
				$.latex_begin,
				repeat(choice($.latex_code_line, $.blank_line)),
				$.latex_end,
			),

		latex_begin: ($) => seq(
			'\\begin\{code\}',
			// Latex code blocks are ignored by the compiler
			// if they start with \begin{code}%<whatever>
			optional($.latex_comment),
			$._newline),

		// We parse latex comments to highlight them
		// like comments
		latex_comment: ($) => seq('%', /[^\r\n]*/),
		
		latex_end: ($) => seq('\\end\{code\}', $._newline),

		latex_code_line: ($) => seq($.haskell_code, $._newline),

		// Markdown-style code blocks
		markdown_code_block: ($) =>
			seq(
				$.markdown_begin,
				repeat(choice($.markdown_code_line, $.blank_line)),
				$.markdown_end,
			),

		markdown_begin: ($) => seq('```haskell', $._newline),

		markdown_end: ($) => seq('```', $._newline),

		markdown_code_line: ($) => seq($.haskell_code, $._newline),

		// Haskell code content
		// This is a placeholder that will be injected with actual Haskell grammar
		haskell_code: ($) => /[^\r\n]*/,

		// Prose/documentation lines
		// Any line that doesn't start with >, \, or #
		prose_line: ($) =>
			seq(
				// Regular text line (not starting with >, \, or #)
				/([^\\><\r\n`]|`{1,2}[^`])[^\r\n]*/,
				$._newline,
			),

		blank_line: ($) => $._newline,

		// Newline supporting both Windows and Unix
		_newline: ($) => /\r?\n/,
	},
});
