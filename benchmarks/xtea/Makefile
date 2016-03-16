OPTS=--opt-all --opt-whole-program=off -fforce-recomp --debug

aplite: xtea.hs
	hastec $(OPTS) xtea.hs -DTUNING=defaultTuning --output-html

aplite-asm: xtea.hs
	hastec $(OPTS) xtea.hs -DTUNING='asmjsTuning {explicitHeap = Just 0x1000000}' --output-html

haskell: xtea_hs.hs
	hastec $(OPTS) --output-html xtea_hs.hs
