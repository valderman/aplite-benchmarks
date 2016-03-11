examples: haskell js asmjs aplite

clean:
	rm *~ *.hi *.o *.jsmod 2> /dev/null ; true

distclean: clean
	rm perlin_hs.js perlin_hs.html perlin_js.html perlin_asm.html

haskell: perlin.hs Pixels.hs perlin.html
	hastec perlin.hs -o perlin_hs.js
	cpp -P -DJSFILE=perlin_hs.js perlin.html -o perlin_hs.html

aplite: perlin_aplite.hs Pixels.hs perlin.html
	hastec perlin_aplite.hs -o perlin_aplite.js --opt-all
	cpp -P -DJSFILE=perlin_aplite.js perlin.html -o perlin_aplite.html

js: perlin_js.js perlin.html
	cpp -P -DJSFILE=perlin_js.js perlin.html -o perlin_js.html

asmjs: perlin_asm.js perlin.html
	cpp -P -DJSFILE=perlin_asm.js perlin.html -o perlin_asm.html
