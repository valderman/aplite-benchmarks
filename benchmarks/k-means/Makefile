OPTS=--opt-all --opt-whole-program=off -fforce-recomp

aplite: KMeans.hs k-means.hs
	hastec $(OPTS) k-means.hs -DTUNING=defaultTuning

aplite-asm: KMeans.hs k-means.hs
	hastec $(OPTS) k-means.hs -DTUNING='asmjsTuning {explicitHeap = Just 0x10000000}'
