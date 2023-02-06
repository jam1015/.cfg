return {
	settings = {
		filetypes = { "r", "R", "rmd", "Rmd" }, log_level = { 2 }, cmd = { "R", "--slave", "-e", "languageserver::run()" }
	}
}
-- styling is performed by lintr in the .lintr file

--can also set some options in the .rprofile options(languageserver.snippet_support = FALSE)
--options(
--    languageserver.server_capabilities = list(
--        definitionProvider = FALSE
--    )
--)
--    languageserver.formatting_style = function(options) {
--      styler::tidyverse_style()
--    }

-- there is a json option for changing these as well but I'm not sure what it is.
