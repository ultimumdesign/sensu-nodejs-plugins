release:
	tar czf ./${PROJECT}_${VERSION}_alpine_amd64.tar.gz bin/
	sum=$$(sha512sum ./${PROJECT}_${VERSION}_alpine_amd64.tar.gz | cut -d ' ' -f 1); \
	f=$$(basename ${PROJECT}_${VERSION}_linux_amd64.tar.gz); \
	echo $$sum $${f} > ./${PROJECT}_${VERSION}_sha512_checksums.txt; \
	echo $$sum;
