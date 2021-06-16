void gets(char x[])
{
    char c;
    int len = 0;
    for (; '\n' != (c = getchar()); len++)
        x[len] = c;
    x[len] = '\0';
}