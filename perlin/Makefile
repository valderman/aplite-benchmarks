examples: haskell js asmjs

haskell: perlin.hs Pixels.hs perlin.html
	hastec --opt-all perlin.hs -o perlin_hs.js
	cpp -P -DJSFILE=perlin_hs.js perlin.html -o perlin_hs.html

js: perlin_js.js perlin.html
	cpp -P -DJSFILE=perlin_js.js perlin.html -o perlin_js.html

asmjs: perlin_asm.js perlin.html
	cpp -P -DJSFILE=perlin_asm.js perlin.html -o perlin_asm.html
