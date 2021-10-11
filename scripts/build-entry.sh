dir=$(ls -l ./packages | awk '/^d/ {print $NF}')
touch packages/index.ts
echo "import { version, author } from '../package.json';" >packages/index.ts

for m in $dir; do

    arr=($(echo $m | tr '-' ' '))
    result=''
    for var in ${arr[@]}; do
        firstLetter=$(echo ${var:0:1} | awk '{print toupper($0)}')
        otherLetter=${var:1}
        result=$result$firstLetter$otherLetter
    done

    firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
    result=$firstResult${result:1}

    first=$(echo $result | cut -c1 | tr [a-z] [A-Z])
    second=$(echo $result | cut -c2-)

    if [ $m != "utils" ] && [ $m != "styles" ]; then
        echo "import $first$second from './$m';" >>packages/index.ts
    fi
done

echo "
// import directive from '../src/directive';
// import filters from '../src/filters';
// import plugins from '../src/plugins';

const install = function (app, opts = {}) {" >>packages/index.ts

for m in $dir; do

    arr=($(echo $m | tr '-' ' '))
    result=''
    for var in ${arr[@]}; do
        firstLetter=$(echo ${var:0:1} | awk '{print toupper($0)}')
        otherLetter=${var:1}
        result=$result$firstLetter$otherLetter
    done

    firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
    result=$firstResult${result:1}

    first=$(echo $result | cut -c1 | tr [a-z] [A-Z])
    second=$(echo $result | cut -c2-)

    # -a=与 -o=或 && ||
    # if [ ! -f "./packages/$m/$m.ts" ]; then
    if [ $m != "utils" ] && [ $m != "styles" ]; then
        echo "app.component($first$second.name, $first$second);" >>packages/index.ts
    fi
done

echo "
app.config.globalProperties.\$UILIBVUE3 = {
    size: opts.size || '',
    zIndex: opts.zIndex || 5000,
};" >>packages/index.ts

for m in $dir; do

    arr=($(echo $m | tr '-' ' '))
    result=''
    for var in ${arr[@]}; do
        firstLetter=$(echo ${var:0:1} | awk '{print toupper($0)}')
        otherLetter=${var:1}
        result=$result$firstLetter$otherLetter
    done

    firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
    result=$firstResult${result:1}

    first=$(echo $result | cut -c1 | tr [a-z] [A-Z])
    second=$(echo $result | cut -c2-)

    if [ -f "./packages/$m/$m.ts" ]; then
        fileName="$m.ts"
        echo "app.config.globalProperties.\$$result = $first$second;" >>packages/index.ts
    fi
done

echo "
// app.use(directive);
// app.use(filters);
// app.use(plugins);
};" >>packages/index.ts
echo "

export default {
    version: version,
	author: author.name,
	install," >>packages/index.ts

for m in $dir; do

    arr=($(echo $m | tr '-' ' '))
    result=''
    for var in ${arr[@]}; do
        firstLetter=$(echo ${var:0:1} | awk '{print toupper($0)}')
        otherLetter=${var:1}
        result=$result$firstLetter$otherLetter
    done

    firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
    result=$firstResult${result:1}

    first=$(echo $result | cut -c1 | tr [a-z] [A-Z])
    second=$(echo $result | cut -c2-)

    if [ $m != "utils" ] && [ $m != "styles" ]; then
        echo "$first$second," >>packages/index.ts
    fi
done

echo "}" >>packages/index.ts
npx prettier --write packages/index.ts
