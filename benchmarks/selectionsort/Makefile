OPTS=--opt-all --opt-whole-program=off -fforce-recomp --debug

aplite: sort.hs
	hastec $(OPTS) sort.hs -DTUNING=defaultTuning --output-html

aplite-asm: sort.hs
	hastec $(OPTS) sort.hs -DTUNING='asmjsTuning {explicitHeap = Just 0x1000000}' --output-html

haskell: sort_hs.hs
	hastec $(OPTS) --output-html sort_hs.hs
